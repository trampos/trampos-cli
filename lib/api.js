
const fetch = require("node-fetch");

module.exports = {
    search: async (skill="") => {
        
        const response = await fetch(`http://trampos.co/api/v2/opportunities?ct[]=programacao&tr=${skill}`);
        const json = await response.json();

        // Setando url enquanto o endpoint não está trazendo
        json.opportunities.forEach((o) => {
            o.url = `https://trampos.co/opportunidades/${o.id}`;
    
        })
        return json.opportunities;
    }
}