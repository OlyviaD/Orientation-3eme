const centresInteretModel = require('./../model/centres_interetModel');

function listeCentresInteretCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    } centresInteretModel.lireTousLesCentresInteret().then(function (done, err) {
        if (err) throw err;
        res.render('ctres_interet', {centres_interet : done});
    });
}

module.exports = {
    listeCentresInteretCtrl : listeCentresInteretCtrl
}