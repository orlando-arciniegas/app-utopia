const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

const mainRoutes = require('./routes/main');
const patientsRoutes = require('./routes/patients');

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', mainRoutes)
app.use('/patients', patientsRoutes)

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});