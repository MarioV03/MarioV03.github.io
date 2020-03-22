
let simulation = {
    planetInputs: [
        planet.init(3000, "#0080ff",   1000, 400, 5, 0, 0, 0),
        planet.init(8000, "#ffff00",   1000, 700, 0, 0, 0, 0),
        planet.init(3000, "#ff8000",   1000, 1000, -5, 0, 0, 0)
    ],
    scale: 2,
    rate: 30,

    getInputs: function(pan, scale, rate) 
    {
        this.planetInputs = planetsFromPanel(pan);
        this.scale = scale;
        this.rate = rate;
    },

    json: function()
    {
        return JSON.stringify(this, undefined, 2);
    },

    getPlanets: function()
    {
        let p = this.planetInputs;
        return p;
    },

    clone: function()
    {
        return JSON.parse(this.json());
    }
}