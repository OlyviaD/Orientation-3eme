// déclaration de la connexion SQL
const connSql = require('./../configuration/mysqlConfig');

function lireTousLesCentresInteret() {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM centres_interet");
        return resultat
    });
}

module.exports = {
    lireTousLesCentresInteret : lireTousLesCentresInteret
}
