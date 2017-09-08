const etablissementModel = require('./../model/etablissementModel');

function formulaireIncriptionEtablissementCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')}
    res.render('ajoutEtablissement');
}

function listeEtablissementsCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    etablissementModel.lireTousLesEtablissements().then(function(done, err){
        if (err) throw err;
        res.render('etablissements', {etablissements: done});
    });
}

function ajoutEtablissementCtrl(req, res) {
    if (req.body.nom === null || req.body.adresse === null || req.body.departement === null || req.body.telephone === null || req.body.email === null || req.body.formations === null) {
        res.render('ajoutEtablissement');
    }
    etablissementModel.ajouterEtablissement(req.body.nom, req.body.adresse, req.body.departement, req.body.telephone, req.body.email, req.body.formations).then(function (done, err) {
        if (err) throw err;
        res.redirect('/etablissements');
    });
}

function supprimerEtablissementCtrl(req, res) {
    etablissementModel.supprimerEtablissementId(req.params.id).then(function (resultat, err) {
        if (err) throw err;
        res.redirect('/etablissements');
    });
}

function listeModifierEtablissementCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    etablissementModel.lireModifierEtablissement(req.params.id).then(function (done, err) {
        if (err) throw err;
        res.render('modificationEtablissement', {etablissements: done});
        // {etablissements: done} fait passer les paramètres à la vue
    });
}

function modifierEtablissementCtrl(req, res) {
    etablissementModel.modifierEtablissement(req).then(function (done, err) {
        if (err) throw err;
        res.redirect('/etablissements');
    });
}

module.exports = {
    formulaireIncriptionEtablissementCtrl : formulaireIncriptionEtablissementCtrl,
    listeEtablissementsCtrl : listeEtablissementsCtrl,
    ajoutEtablissementCtrl : ajoutEtablissementCtrl,
    supprimerEtablissementCtrl : supprimerEtablissementCtrl,
    listeModifierEtablissementCtrl : listeModifierEtablissementCtrl,
    modifierEtablissementCtrl : modifierEtablissementCtrl
}