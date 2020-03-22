let sim;
let planets;

let panel = document.getElementById("subpanel");

let numOfPlanets = document.getElementById("num");
let rateInput = document.getElementById("rate");
let scaleInput = document.getElementById("scale");

let run_button = document.getElementById("run_button");
let new_button = document.getElementById("new_button");
let load_button = document.getElementById("load_button");
let save_button = document.getElementById("save_button");


//main loop timer
let interval;
let running = false;

//main loop events
function update()
{
    applyForces(planets);
    movePlanets(planets);
    drawPlanets(planets, sim.scale);
    drawAcceleration(planets, sim.scale);
}

function run()
{
    running = true;
    interval = setInterval(update, sim.rate);
}

function stop()
{
    running = false;
    clearInterval(interval);
}

function initSimulation()
{
    sim = simulation.clone();
    planets = sim.planetInputs;
    planetPanels = [];

    panel.innerHTML = "";
    
    numOfPlanets.value = "";
    numOfPlanets.disabled = false;

    rateInput.value = sim.rate;
    scaleInput.value = sim.scale;
}


//Handling master panel inputs

rateInput.oninput = function() 
{
    if(running)
    {
        clearInterval(interval);
        sim.rate = rateInput.value;
        interval = setInterval(update, sim.rate);
    }
}

scaleInput.oninput = function() 
{
    sim.scale = scaleInput.value;
}

numOfPlanets.oninput = function()
{
    if(numOfPlanets.value == 0) return;
    if(numOfPlanets.value > 3 || numOfPlanets.value < 1)
    {
        alert("Invalid number of planets, please choose within a range of [1-3]");
        return;
    }
    planetPanels = addPanels(numOfPlanets.value);
    numOfPlanets.disabled = true;
}

//Handling master panel buttons

run_button.onclick = function() 
{
    if(!running)
    {
        planets = planetsFromPanel(planetPanels);
        if(!planets) return;
        run_button.innerHTML = "Stop";
        run_button.setAttribute("style", "background: #900");
        run();
    }
    else
    {
        stop();
        run_button.innerHTML = "Run";
        run_button.setAttribute("style", "background: #060");
    }
}

new_button.onclick = function()
{
    stop();
    initSimulation();
}

save_button.onclick = function() 
{
    if(!planetsFromPanel(planetPanels)) return;
    simulation.getInputs(planetPanels, scaleInput.value, rateInput.value);
    json_string = simulation.json();
    let link = document.createElement('a');
    let name = prompt("Name your simulation", "MySimulation");
    if (name === null) return;
    link.download = name + '.txt';
    let blob = new Blob([json_string], {type: 'text/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

load_button.onclick = function()
{
    if(document.getElementById("file").value == "")
    {
        alert("ERROR: input field is empty. Default simulation will be loaded");
        initSimulation();
        
    }
    else
    {
        sim = JSON.parse(document.getElementById("file").value);
    }
    planetPanels = recreatePanel(sim);
}

initSimulation();