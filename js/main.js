let scale = 2;

//Setting up planets
let planets = [
    planet.init(3000, "green",    700, 700, 0, 12, 0, 0),
    planet.init(40000, "yellow", 1000, 700, 0, 0, 0, 0),
    planet.init(3000, "red",     1300, 700, 0, -12, 0, 0)
];
    
//main loop
function update()
{
    applyForces(planets);
    movePlanets(planets);
    drawPlanets(planets, scale);
    drawAcceleration(planets, scale);
    console.log(planets[1].ax, planets[1].ay)
}
//main loop timer
setInterval(update, 20);
