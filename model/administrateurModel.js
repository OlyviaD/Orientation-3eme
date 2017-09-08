// déclaration de la connexion SQL
const connSql = require('./../configuration/mysqlConfig.js');

//############################################################################

// nous permet d'obtenir la liste de tous les administrateurs (app.get '/administrateurs')
function lireTousLesAdmins(){
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM administrateur");
        return resultat
    });
}

// nous permet d'ajouter un administrateur (app.post '/administrateurs/ajouter')
function ajouterAdmin(Admin, motdepasse) {
    return connSql.then(function (sql) {
        let resultat = sql.query("INSERT INTO administrateur (adm, motdepasse) VALUES(?,?)", [Admin, motdepasse]);
        return resultat
    });
}

// nous permet de supprimer un administrateur (app.delete '/administrateurs/:id')
function supprimerAdminId(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("DELETE FROM administrateur WHERE id=?", [userId]);
        return resultat
    });
}

// nous permet de ne récupérer que l'administrateur ayant l'id correspondant
function listeModifierAdmin(userId) {
    return connSql.then(function (sql) {
        let resultat = sql.query("SELECT * FROM administrateur WHERE id=?", [userId]);
        return resultat
    });
}

// modifie les éléments de la table
function modifierAdmin(req) {
    let donnees = [req.body.adm, req.body.motdepasse, req.params.id]
    return connSql.then(function (sql) {
        let resultat = sql.query("UPDATE administrateur SET adm=?, motdepasse=? WHERE id=?", donnees);
        return resultat
    });
}

module.exports = {
    // {} représente l'objet, on a ensuite la clé suivie de la valeur { clé : valeur }
    lireTousLesAdmins : lireTousLesAdmins,
    ajouterAdmin : ajouterAdmin,
    supprimerAdminId : supprimerAdminId,
    listeModifierAdmin : listeModifierAdmin,
    modifierAdmin : modifierAdmin,
};