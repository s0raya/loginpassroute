// Snippets de código para poder componer el programa

//Usado?: YES - middlewares.js
const middlewares = require('./middlewares');
//--- Explicación:Importamos el archivo middlewares para poder trabajar con las funciones que hay dentro de él.
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
const bodyParser = require('body-parser');
//--- Explicación: Importamos la libreria de body-parser para analizar y procesar los datos del formulario enviado con la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: YES - middlewares.js
const session = require('express-session');
//--- Explicación: Importamos express-session para verificar que sabe la palabra correcta y así accceder al perfil.
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
const express = require('express');
//--- Explicación: Importamos express para trabajar con ello.
// -------------------------------------------------------------------------------------

//Usado?: YES - routes.js
const bodyParser = require('body-parser');
//--- Explicación: Importamos la libreria de body-parser para analizar y procesar los datos del formulario enviado con la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
const session = require('express-session');
//--- Explicación: Importamos express-session para verificar que sabe la palabra correcta y así accceder al perfil.
// -------------------------------------------------------------------------------------

//Usado?: YES - middlewares.js
const dotenv = require('dotenv');
//--- Explicación: Es un paquete de nodejs que nos permite configurar o usar las variables de entorno en nuestro codigo.
// -------------------------------------------------------------------------------------

//Usado?: YES - middlewares.js
const middlewares = require('./middlewares');
//--- Explicación: Importamos el archivo middlewares para poder trabajar con las funciones que hay dentro de él.
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
const routes = require('./routes');
//--- Explicación:Importamos el archivo routes para poder manejar las rutas desde app.js

//Usado?: YES - middlewares.js
dotenv.config();
//--- Explicación: Accedemos a la configuracion de dotenv para manejar las variables de entorno
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
const app = express();
//--- Explicación: Esta variable establece el entorno express. 

//Usado?: YES - app.js
const PORT = 4000;
//--- Explicación: Esta es la variable para establecer el servidor en el que vamos a trabajar. 

//Usado?: YES - middlewares.js
const dotenv = require('dotenv');
//--- Explicación: Es un paquete de nodejs que nos permite configurar o usar las variables de entorno en nuestro codigo.

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación: Accedemos a la configuracion de dotenv para manejar las variables de entorno

// -------------------------------------------------------------------------------------

//Usado?: YES - routes.js
middlewares.setupApp(app);
//--- Explicación: Accedemos a la funcion setupApp que está dentro de middlewares y le pasamos el parametro app.

// -------------------------------------------------------------------------------------

//Usado?: YES - routes.js
routes.setup(app);
//--- Explicación: Accedemos a la funcion setup que está dentro de routes y le pasamos el parametro app.

// -------------------------------------------------------------------------------------

//Usado?: YES - middlewares.js
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Esta función valida la palabra del input, si es correcta accedemos a la sesión. Si no lo es nos devuelve un error.


//Usado?: YES - routes.js
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Es la funcion que va dentro de routes para configurar todas las rutas, si es correcta accederemos a '/profile', si es incorrecta nos
// da el error.


// -------------------------------------------------------------------------------------


//Usado?: YES - routes.js
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Este código muestra el contenido HTML en la página de inicio. 

//Usado?: YES - middlewares.js
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Declaramos la funcion setupApp para manejar la palabra del input.
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Validamos la palabra con el middleware 'validarPalabraMiddleware' y si es correcta accedemos.

// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: Codificamos la palabra con 'urlencoded' y bodyParser es para analizar la palabra, 'extended:true' significa que
// el input contendrá valores de todo tipo en lugar de solo strings.

// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: este código configura el middleware de sesión para la aplicación Node.js, 
//utilizando una clave secreta para firmar las cookies de sesión, evitando el almacenamiento innecesario de sesiones no modificadas 
//y permitiendo el almacenamiento de sesiones no inicializadas.
// -------------------------------------------------------------------------------------

//Usado?: YES - app.js
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Este código habilita el puerto del servidor establecido en la variable PORT


 //Usado?: YES - middlewares.js
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Este middleware actúa de filtro para ver si estas logado con la palabra secreta. Si no estas logado nos muestra el error=2


//Usado?: YES - routes.js
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Obtenemos el perfil de usuario tras la comprobacion con el middleware 'verificarSesionMiddleware'. Y hay un boton de cerrar sesion.

// -------------------------------------------------------------------------------------


//Usado?: YES - routes.js
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Cuando le damos a al boton de cerrar sesion creado en el anterior bloque de codigo, nos deriva de nuevo a la raiz.

// -------------------------------------------------------------------------------------

//Usado?: YES - routes.js
module.exports = {
  setup,
};
//--- Explicación: Exportamos 'setup' para poder ser usado en otro archivo.

// -------------------------------------------------------------------------------------

//Usado?: YES - middlewares.js
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exportamos los middleware para poder ser usados en otros archivos.

// -------------------------------------------------------------------------------------

