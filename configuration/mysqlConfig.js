/*
Promise-mysql is a wrapper for mysqljs/mysql that
wraps function calls with Bluebird promises. Usually this would be done with
Bluebird's .promisifyAll() method, but mysqljs/mysql's footprint is different to that
of what Bluebird expects.
*/

// chargement du module qui va être récupéré dans le dossier node_modules
const mysql = require('promise-mysql');

// création de la connexion avec la base de données
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    //password: "",
    database: "Orientation"
});


// permet d'exposer connection comme un module
module.exports = connection;