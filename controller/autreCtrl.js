const autreModel = require('./../model/autreModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function accueilCtrl(req, res) {
    res.render('accueil');
}

function authentificationCtrl(req, res) {
    if(req.body.identifiant == null || req.body.motdepasse == null){
        res.redirect('/');
    }
    var identifiant = req.body.identifiant;
    var motdepasse = req.body.motdepasse;
    autreModel.recuperationAuthentification(identifiant).then(function (resultat, err) {
        if (err) throw err;
        if (resultat.length === 1) {
/*            bcrypt.compare(motdepasse, resultat[0].motdepasse, function (err, resCompare) {
                if (resCompare === true) {*/
                    if (motdepasse === resultat[0].motdepasse) {
                        req.session.admin = true;
                        res.redirect('/categories')
                    } else {
                        req.session.admin = false;
                        res.redirect('/')
                    }
                }
                else {
                    res.redirect('/');
                }
            });
    /* }
    });*/
}


function deconnexionCtrl(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    });
}

function lireListeCategoriesCtrl(req,res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')}
    res.render('categories');
}

module.exports = {
    accueilCtrl : accueilCtrl,
    authentificationCtrl : authentificationCtrl,
    deconnexionCtrl : deconnexionCtrl,
    lireListeCategoriesCtrl : lireListeCategoriesCtrl,
}