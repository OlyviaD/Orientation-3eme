const connSql = require('../configuration/mysqlConfig');

// ###################################################################

function recuperationAuthentification(identifiant){

        return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM administrateur WHERE adm = ?", [identifiant]);
        return resultat
    });
}

module.exports = {
    // {} représente l'objet, on a ensuite la clé suivie de la valeur { clé : valeur }
    recuperationAuthentification : recuperationAuthentification,
}
