function createInputField(name, planetPanel)
{
    let p = document.createElement("p");
    p.innerHTML = name;
    planetPanel.appendChild(p);
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("step", "10");
    p.appendChild(input);

    return input;
}

function createPlanetPanel(masterPanel, index)
{
    let planetPanel = document.createElement("div");
    planetPanel.setAttribute("class", "planet_panel");
    masterPanel.appendChild(planetPanel);

    let heading = document.createElement("h1");
    heading.innerHTML = "Planet " + index + " ";
    planetPanel.appendChild(heading);

    let colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("value", "#ffff00");
    heading.appendChild(colorInput);

    let p_mass = document.createElement("p");
    p_mass.setAttribute("style", "width: 90%;");
    p_mass.innerHTML = "Mass ";
    planetPanel.appendChild(p_mass);
    let massInput = document.createElement("input");
    massInput.setAttribute("type", "number");
    massInput.setAttribute("step", "100");
    massInput.value = 3000;
    p_mass.appendChild(massInput);

    let xInput = createInputField("x ", planetPanel);
    let dxInput = createInputField("dx ", planetPanel);
    let yInput = createInputField("y ", planetPanel);
    let dyInput = createInputField("dy ", planetPanel);

    let planetInput =
    {
        color: colorInput,
        mass: massInput,
        x: xInput,
        y: yInput,
        dx: dxInput,
        dy: dyInput
    }

    return planetInput;

}

function fillPanel(planetPanels, sim_)
{
    for (let i = 0; i < sim.planetInputs.length; i++) {
        planetPanels[i].color.value = sim_.planetInputs[i].color;
        planetPanels[i].mass.value = sim_.planetInputs[i].mass;
        planetPanels[i].x.value = sim_.planetInputs[i].x;
        planetPanels[i].y.value = sim_.planetInputs[i].y;
        planetPanels[i].dx.value = sim_.planetInputs[i].dx;
        planetPanels[i].dy.value = sim_.planetInputs[i].dy;
    }
}

function addPanels(howmany)
{    
    let pan = [];
    for (let i = 0; i < howmany; i++) {
        pan[i] = createPlanetPanel(panel, i + 1);
    }
    return pan;
}

function planetsFromPanel(pan) 
{
    if(pan.length === 0)
    {
        alert("ERROR: No planet panels");
        return false;
    }
    else
    {
        let p = [];
        for (let i = 0; i < pan.length; i++) {
            p[i] = planet.initFromPanel(pan[i]);
        }
        return p;
    }
}

function recreatePanel(s)
{
    planetPanels = [];
    panel.innerHTML = "";

    pan = addPanels(s.planetInputs.length);
    fillPanel(pan, s);

    return pan;
}
