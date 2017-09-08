const secteursActiviteModel = require('./../model/secteurs_activiteModel');

function listeSecteursActiviteCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    } secteursActiviteModel.lireTousLesSecteursActivite().then(function (done, err) {
        if (err) throw err;
        res.render('secteur_activite', {secteur_activite : done});
    });
}

module.exports = {
    listeSecteursActiviteCtrl : listeSecteursActiviteCtrl
}
