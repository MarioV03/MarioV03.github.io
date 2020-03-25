const canvas = document.getElementById("scene");
const canvas2 = document.getElementById("overlay");
const context = canvas.getContext("2d");
const context2 = canvas2.getContext("2d");

context2.globalAlpha = 0.01;

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

  init: function(mass, color, x, y, dx, dy, ax, ay) {
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
  },

  initFromPanel: function(panelInput) {
    let obj = Object.create(planet);
    obj.mass = Number(panelInput.mass.value);
    obj.color = panelInput.color.value;
    obj.radius = Math.pow(obj.mass, 0.3);
    obj.x = Number(panelInput.x.value);
    obj.y = Number(panelInput.y.value);
    obj.dx = Number(panelInput.dx.value);
    obj.dy = Number(panelInput.dy.value);
    return obj;
  }
};

//Rendering
function drawPlanets(planets, scale) {
  context.clearRect(0, 0, 1000, 700);
  for (i = 0; i < planets.length; i++) {
    context.beginPath();
    context.arc(
      planets[i].x / scale,
      planets[i].y / scale,
      Math.abs(planets[i].radius) / scale,
      0,
      6.29
    );
    context.fillStyle = planets[i].color;
    context.fill();
    context.closePath();
  }
}

function drawAcceleration(planets, scale) {
  for (i = 0; i < planets.length; i++) {
    context.beginPath();
    context.moveTo(planets[i].x / scale, planets[i].y / scale);
    context.lineTo(
      planets[i].x / scale + 100 * planets[i].ax,
      planets[i].y / scale + 100 * planets[i].ay
    );
    context.strokeStyle = planets[i].color;
    context.stroke();
    context.closePath();
  }
}

function drawTrajectory(planets, scale) {
  for (i = 0; i < planets.length; i++) {
    context2.fillStyle = planets[i].color;
    context2.fillRect(Math.floor(planets[i].x / scale), Math.floor(planets[i].y / scale), 1, 1);
  }
}

function clearTrajectory() {
  context2.clearRect(0, 0, 1000, 700);
}

//Physics
const precision = 0.0000001;

function movePlanets(planets) {
  for (i = 0; i < planets.length; i++) {
    if (planets[i].ax < precision && planets[i].ax > -precision)
      planets[i].ax = 0;
    if (planets[i].ay < precision && planets[i].ay > -precision)
      planets[i].ay = 0;

    planets[i].dx += planets[i].ax/dt;
    planets[i].dy += planets[i].ay/dt;
    planets[i].x += planets[i].dx/dt;
    planets[i].y += planets[i].dy/dt;
  }
}

//Forces and acceleration
function accel_x(planet, star, dist) {
  return (star.mass / dist / dist / dist) * (star.x - planet.x);
}

function accel_y(planet, star, dist) {
  return (star.mass / dist / dist / dist) * (star.y - planet.y);
}

function distance(p1, p2)
{
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function applyForces(planets) {
  /* planets[0].ax += accel_x(planets[0], planets[1], Dist[0]);
    planets[0].ay += accel_y(planets[0], planets[1], Dist[0]); */

  for (i = 0; i < planets.length; i++) 
  {
    planets[i].ax = 0;
    planets[i].ay = 0;

    for (k = 1; k < planets.length; k++)
    {
      let dist = distance(planets[i], planets[(i+k)%planets.length]);
      planets[i].ax += accel_x(planets[i], planets[(i+k)%planets.length], dist);
      planets[i].ay += accel_y(planets[i], planets[(i+k)%planets.length], dist);
    }
  }
}