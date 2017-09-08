// déclaration de la connexion SQL
const connSql = require('./../configuration/mysqlConfig');

function lireTousLesSecteursActivite() {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM secteurs_activite");
        return resultat
    });
}

module.exports = {
    lireTousLesSecteursActivite : lireTousLesSecteursActivite
}