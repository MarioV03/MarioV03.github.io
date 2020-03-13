const canvas = document.getElementById("scene");
const context = canvas.getContext("2d");

//Planets data
var planet = {
    mass: 10000,
    color: "white",
    x: 500,
    y: 300,
    dx: 0,
    dy: 0,
    ax: 0,
    ay: 0,

    init: function(mass, color, x, y, dx, dy, ax, ay)
    {
        let obj = Object.create(planet);
        obj.mass = mass;
        obj.color = color;
        obj.x = x;
        obj.y = y;
        obj.dx = dx;
        obj.dy = dy;
        obj.ax = ax;
        obj.ay = ay;
        return obj;
    }
};

//Rendering
function drawPlanets(planets, scale)
    {
        context.clearRect(0, 0, 1600, 1000)
        for(i = 0; i < planets.length; i++)
        {
            context.beginPath();
            context.arc(planets[i].x/scale, planets[i].y/scale, 15/scale, 0, 6.29);
            context.fillStyle = planets[i].color;
            context.fill();
            context.closePath();
        }
}

//Physics
function movePlanets(planets)
{
    for(i = 0; i < planets.length; i++)
    {
        planets[i].dx += planets[i].ax;
        planets[i].dy += planets[i].ay;
        planets[i].x += planets[i].dx;
        planets[i].y += planets[i].dy;
    }
}

//Forces and acceleration
function accel_x(planet, star, dist)
{
    return star.mass/dist/dist/dist*(star.x - planet.x);
}

function accel_y(planet, star, dist)
{
    return star.mass/dist/dist/dist*(star.y - planet.y);
}

function applyForces(planets)
{
    let Dist =[];  //distances between planets (0 is between 0 and 1, 1 is between 1 and 2)
    for(i = 0; i < planets.length; i++)
    {
        Dist[i] = (planets[i].x - planets[(i+1)%planets.length].x)*(planets[i].x - planets[(i+1)%planets.length].x) + 
        (planets[i].y - planets[(i+1)%planets.length].y)*(planets[i].y - planets[(i+1)%planets.length].y);
        Dist[i] = Math.sqrt(Dist[i]);
    }

    /* planets[0].ax += accel_x(planets[0], planets[1], Dist[0]);
    planets[0].ay += accel_y(planets[0], planets[1], Dist[0]); */

    for(i = 0; i < planets.length; i++)
    {
        for(j = 1; j < planets.length; j++)
        {
            planets[i].ax += accel_x(planets[i], planets[(i+j)%planets.length], Dist[i]);
            planets[i].ay += accel_y(planets[i], planets[(i+j)%planets.length], Dist[i]);
        }
    }
    
}