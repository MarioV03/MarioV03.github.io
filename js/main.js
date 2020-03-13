let scale = 1;

//Setting up planets
let planets = [
    planet.init(20, "green", 400, 500, 12, 8, 0, 0),
    planet.init(4000, "blue", 800, 500, 0, 0, 0, 0),
    /* planet.init(200, "red", 800, 700, 10, 0, 0, 0) */
];
    
//main loop
function update()
{
    applyForces(planets);
    movePlanets(planets);
    drawPlanets(planets, scale);
    console.log(planets[0].x, planets[0].y)
}
//main loop timer
setInterval(update, 40);
