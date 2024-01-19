const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const middlewares = require('./middlewares');
const routes = require('./routes');
const app = express();

middlewares.setupAPP(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

routes.setup(app);

const PORT = 4000;

app.listen(PORT, () => {
console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
