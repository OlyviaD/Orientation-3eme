// déclaration du module Express
const express = require('express');
const app = express();

//############################################################################
/* déclaration d'Express Static
process.cwd() retourne le dossier contenant app.js (ici, back-office) */
app.use("/public", express.static(process.cwd() + "/fichiersStatiques"));

//############################################################################

//déclaration d'Express Session
const session = require('express-session');

// utilisation d'Express Session
app.use(session({
    secret: 'aqwpml', // permet d'éviter les trafics, manipulations
    resave: true,
    saveUninitialized: true
}));

//##############################################################################

// déclaration des controller
const administrateurCtrl = require('./controller/administrateurCtrl');
const metierCtrl = require('./controller/metierCtrl');
const etablissementCtrl = require('./controller/etablissementCtrl');
const autreCtrl = require('./controller/autreCtrl');
const centresInteretCtrl = require('./controller/centres_interetCtrl');
const secteursActiviteCtrl = require('./controller/secteurs_activiteCtrl');
const accueilFrontOfficeCtrl = require('./controller/accueilFrontOfficeCtrl');

//############################################################################

// on récupère les données avec body parser
const bodyParser = require('body-parser');

// on prévient express qu'il faut utiliser body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// si extended est "true", la valeur peut être de n'importe quel type
// si extended est "false", la valeur est soit un string soit un array

//############################################################################

/*
chiffrement du mot de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;
*/

// utilisation d'EJS : view engine (moteur de vue) est la clé qui permet d'aller chercher ejs)
app.set("view engine", "ejs");


//#############################################################################

//déclaration la méthode override (méthode cachée)
const methodOverride = require('method-override');

// utilisation de la méthode override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    } // on va récupérer _method pour le supprimer et le remplacer par method
}));


// ================================================================================================
//                                      LES ROUTES
// ================================================================================================

app.get('/', autreCtrl.accueilCtrl);

app.post('/', autreCtrl.authentificationCtrl);

app.get('/deconnexion', autreCtrl.deconnexionCtrl);

// une fois entré dans l'interface, on voit toutes les catégories
app.get('/categories', autreCtrl.lireListeCategoriesCtrl);

//================= CATEGORIE METIERS ================

app.get('/metier/ajouter', metierCtrl.ajouterMetier);

// liste des métiers avec boutons modifier et supprimer
app.get('/metier', metierCtrl.listeMetierCtrl);

// pour ajouter un métier
app.post('/metier/ajouter', metierCtrl.ajouterMetierCtrl);

// pour supprimer un métier
app.delete('/metier/:id', metierCtrl.supprimerMetierCtrl);

// pour modifier un métier
app.get('/metier/modifier/:id', metierCtrl.listeModifierMetierCtrl);
app.put('/metier/modifier/:id', metierCtrl.modifierMetierCtrl);


//================= CATEGORIE ETABLISSEMENTS ================

app.get('/etablissements/ajouter', etablissementCtrl.formulaireIncriptionEtablissementCtrl);

// liste des établissements avec boutons modifier et supprimer

app.get('/etablissements', etablissementCtrl.listeEtablissementsCtrl);

// pour ajouter un établissement
app.post('/etablissements/ajouter', etablissementCtrl.ajoutEtablissementCtrl);

// pour supprimer un établissement
app.delete('/etablissements/:id', etablissementCtrl.supprimerEtablissementCtrl);

// pour modifier un établissement
app.get('/etablissements/modifier/:id', etablissementCtrl.listeModifierEtablissementCtrl);
app.put('/etablissements/modifier/:id', etablissementCtrl.modifierEtablissementCtrl);

//================== CATEGORIE ADMINISTRATEUR =======================

app.get('/administrateurs/ajouter', administrateurCtrl.formulaireInscriptionAdminCtrl);

// liste des administrateurs avec boutons modifier et supprimer
app.get('/administrateurs', administrateurCtrl.listeAdminsCtrl);

// pour ajouter un administrateur
app.post('/administrateurs/ajouter', administrateurCtrl.ajouterAdminCtrl);

// pour supprimer un administrateur
app.delete('/administrateurs/:id', administrateurCtrl.supprimerAdminCtrl);

// pour modifier un administrateur
app.get('/administrateurs/modifier/:id', administrateurCtrl.listeModifierAdminCtrl);
app.put('/administrateurs/modifier/:id', administrateurCtrl.modifierAdminCtrl);

// ================== CATEGORIE CENTRES D'INTERET ===================
app.get('/centres_interet', centresInteretCtrl.listeCentresInteretCtrl);

// ================== CATEGORIE SECTEURS D'ACTIVITE ===================
app.get('/secteurs_activite', secteursActiviteCtrl.listeSecteursActiviteCtrl);

// =================== ACCUEIL FRONT-OFFICE ===========================
app.get('/accueil', accueilFrontOfficeCtrl.accueilFrontOfficeCtrl);


app.listen(8080, function () {
    console.log("L'application est lancée et en écoute sur http://localhost:8080")
});
