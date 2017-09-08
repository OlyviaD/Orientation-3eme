// déclaration de la connexion SQL
const connSql = require('./../configuration/mysqlConfig');

// ############################################################################

function lireTousLesMetiers() {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM metiers");
        return resultat
    });
}

function ajouterMetier(nom, accesAuMetier, exempleDeParcours, secteursActivite, centresInteret) {
    return connSql.then(function (sql){
        let resultat = sql.query("INSERT INTO metiers(nom, acces_au_metier, exemple_de_parcours, secteurs_activite, centres_interet) VALUES(?,?,?,?,?)", [nom, accesAuMetier, exempleDeParcours, secteursActivite, centresInteret]);
        return resultat
    });
}

function supprimerMetierId(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("DELETE FROM metiers WHERE id=?", [userId]);
        return resultat
    });
}

function lireModifierMetier(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM metiers WHERE id=?", [userId]);
        return resultat
    });
}

function modifierMetier(req) {
    let donnees = [req.body.nom, req.body.acces_au_metier, req.body.exemple_de_parcours, req.body.secteurs_activite, req.body.centres_interet, req.params.id]
    return connSql.then(function (sql) {
        let resultat = sql.query("UPDATE metiers SET nom=?, acces_au_metier=?, exemple_de_parcours=?, secteurs_activite=?, centres_interet=? WHERE id=?", donnees);
        return resultat
    });
}


module.exports = {
    lireTousLesMetiers : lireTousLesMetiers,
    ajouterMetier : ajouterMetier,
    supprimerMetierId : supprimerMetierId,
    lireModifierMetier : lireModifierMetier,
    modifierMetier : modifierMetier
}