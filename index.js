const express = require('express');
const conectarDB = require('./config/db');

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();

app.use(express.json());

app.use('/api/productos',require('./routes/producto'))

//Definimos ruta principal
app.get('/', (req, res) => {
    res.send('Hola world')
})

app.listen(4000, () => {
    console.log("El servidor corre")
})

console.log("Hola mundo")