const canvas = document.getElementById("scene");
const context = canvas.getContext("2d");

//Planets data
var planet = {
    mass: 10000,
    color: "white",
    radius: 15,
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
        obj.radius = Math.pow(mass, 0.3);
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
        context.clearRect(0, 0, 1000, 700)
        for(i = 0; i < planets.length; i++)
        {
            context.beginPath();
            context.arc(planets[i].x/scale, planets[i].y/scale, planets[i].radius/scale, 0, 6.29);
            context.fillStyle = planets[i].color;
            context.fill();
            context.closePath();
        }
}

function drawAcceleration(planets, scale)
{
    for(i = 0; i < planets.length; i++)
        {
            context.beginPath();
            context.moveTo(planets[i].x/scale, planets[i].y/scale);
            context.lineTo(planets[i].x/scale + 100*planets[i].ax, planets[i].y/scale + 100*planets[i].ay);
            context.strokeStyle = planets[i].color;
            context.stroke();
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
        planets[i].ax = 0;
        planets[i].ay = 0;
        
        planets[i].ax += accel_x(planets[i], planets[(i+1)%planets.length], Dist[i]);
        planets[i].ay += accel_y(planets[i], planets[(i+1)%planets.length], Dist[i]);

        planets[i].ax += accel_x(planets[i], planets[(i+2)%planets.length], Dist[(i+2)%3]);
        planets[i].ay += accel_y(planets[i], planets[(i+2)%planets.length], Dist[(i+2)%3]);
    }
    
}