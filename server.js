// MODULES
const express = require("express");

// CONSTANTES
const PORT = 3000;

// INITIALISATION
const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'));


// ROUTES
app.use('/', require('./routes/index'))

// DEMARRAGE
app.listen(PORT, () => {
    console.log("Server listen on port : " + PORT);
  });
  