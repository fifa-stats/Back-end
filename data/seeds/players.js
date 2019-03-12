let csvToJson = require('convert-csv-to-json');

exports.seed = function(knex, Promise) {
  let data = csvToJson.fieldDelimiter(',').getJsonFromCsv("./data/players_data.csv");
  return knex("players")
    .del()
    .then(() => {
      let insertPromises = [];
      let chunk = 1000;
      for (let i = 0; i <= data.length; i += chunk) {
        const players = data.slice(i, i + chunk);
        insertPromises.push(knex("players").insert(players));
      }
      return Promise.all(insertPromises);
    });
};
