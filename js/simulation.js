
let simulation = {
    planetInputs: [
        planet.init(30000, "green",   1000, 400, 5, 0, 0, 0),
        planet.init(40000, "red",     1000, 1000, -3.75, 0, 0, 0)
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