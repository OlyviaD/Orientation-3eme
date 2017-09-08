// déclaration de la connexion SQL
const connSql = require('./../configuration/mysqlConfig.js');

//############################################################################

function lireTousLesEtablissements() {
    return connSql.then(function(sql) {
        let resultat = sql.query("SELECT * FROM etablissements");
        return resultat
    });
}

function ajouterEtablissement(nom, adresse, departement, telephone, email, formation) {
    return connSql.then(function (sql) {
        let resultat = sql.query("INSERT INTO etablissements (nom, adresse, departement, telephone, email, formations) VALUES(?,?,?,?,?,?)", [nom, adresse, departement, telephone, email, formation]);
    return resultat
    });
}

function supprimerEtablissementId(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("DELETE FROM etablissements WHERE id=?", [userId]);
        return resultat
    });
}

function lireModifierEtablissement(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM etablissements WHERE id=?", [userId]);
        return resultat
    });
}

function modifierEtablissement(req) {
    let donnees = [req.body.nom, req.body.adresse, req.body.departement, req.body.telephone, req.body.email, req.body.formations, req.params.id]
    return connSql.then(function (sql) {
        let resultat = sql.query("UPDATE etablissements SET nom=?, adresse=?, departement=?, telephone=?, email=?, formations=? WHERE id=?", donnees);
        return resultat
    });
}

module.exports = {
    lireTousLesEtablissements : lireTousLesEtablissements,
    ajouterEtablissement : ajouterEtablissement,
    supprimerEtablissementId : supprimerEtablissementId,
    lireModifierEtablissement : lireModifierEtablissement,
    modifierEtablissement : modifierEtablissement
}