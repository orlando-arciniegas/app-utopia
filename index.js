const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.use(express.static('public'));
app.set('view engine', 'ejs');
const dataFilePath = path.join(__dirname, 'data.json');



// Leer datos desde el archivo JSON
function readDataFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Escribir datos en el archivo JSON
function writeDataFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

let items = readDataFile();

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/agenda', (req, res) => {
  res.render('agenda')
})


app.get('/search', (req, res) => {
  res.render('buscar')
})

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items/search', (req, res) => {

  // if (!req.body.name) {
  //   return res.status(400).json({ message: 'Se requiere el campo "name" en el cuerpo de la solicitud' });
  // }
  const searchName = req.body.name.toLowerCase();
  const matchingItems = items.filter(item => item.nombre.toLowerCase().includes(searchName));
  res.json(matchingItems);
});

// Resto de rutas (POST, PUT, DELETE) similares al ejemplo anterior...

app.post('/items', (req, res) => {
  const newItem = {
    id: nextItemId,
    ...req.body
  };
  items.push(newItem);
  nextItemId++;
  writeDataFile(items);
  res.status(201).json(newItem);
});

// Resto de rutas (PUT, DELETE) similares al ejemplo anterior...

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});