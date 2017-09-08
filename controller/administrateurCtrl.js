const administrateurModel = require('./../model/administrateurModel');


function formulaireInscriptionAdminCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')}
    res.render('inscription_admin');
}


function listeAdminsCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    administrateurModel.lireTousLesAdmins().then(function(done, err){
        if(err) throw err;
        res.render('liste_admin', {administrateurs: done});
    });
}

function ajouterAdminCtrl(req, res) {
    if (req.body.adm === null || req.body.motdepasse ===  null){
        res.render('inscription_admin');
    }
    administrateurModel.ajouterAdmin(req.body.adm, req.body.motdepasse).then(function (done, err) {
        if (err) throw err;
        res.redirect('/administrateurs');
    });
}

function supprimerAdminCtrl(req, res) {
    administrateurModel.supprimerAdminId(req.params.id).then(function (done, err) {
        if (err) throw err;
        res.redirect('/administrateurs');
    });
}

function listeModifierAdminCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    administrateurModel.listeModifierAdmin(req.params.id).then(function (done, err) {
        if (err) throw err;
        res.render('modificationAdministrateur', {administrateurs: done})
    });
}

function modifierAdminCtrl(req, res) {
    administrateurModel.modifierAdmin(req).then(function (done, err) {
        if (err) throw err;
        res.redirect('/administrateurs');
    });
}

module.exports = {
    // {} représente l'objet, on a ensuite la clé suivie de la valeur { clé : valeur }
    formulaireInscriptionAdminCtrl : formulaireInscriptionAdminCtrl,
    listeAdminsCtrl : listeAdminsCtrl,
    ajouterAdminCtrl : ajouterAdminCtrl,
    supprimerAdminCtrl : supprimerAdminCtrl,
    listeModifierAdminCtrl : listeModifierAdminCtrl,
    modifierAdminCtrl : modifierAdminCtrl,
};
