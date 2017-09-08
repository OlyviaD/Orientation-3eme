const accueilFrontOfficeModel = require('./../model/accueilFrontOfficeModel');

function accueilFrontOfficeCtrl(req, res) {
    res.render('accueil-front');
}

module.exports = {
    accueilFrontOfficeCtrl : accueilFrontOfficeCtrl
}