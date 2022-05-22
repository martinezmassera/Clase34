const express = require('express');
const Contenedor = require('./contenedor.js');
const archivo = new Contenedor('./productos.txt');
const datos = archivo.getAll();

const app = express()

const PORT = process.env.PORT || 8080

app.get('/', (req, response) => {
    response.send(
        "<h1 style=color:blue;>Entrega desafío Clase 6</h1><br><a href=/productos >productos</a><br><a href=/productosRandom >productos Random</a>"
    )
})

app.get('/productos', async(req, response) => {
    const produtxt = await  datos.then((result) =>{ return result});
    response.send(produtxt)
})

app.get('/productosRandom', async (req, response) => {
    const produtxt = await  datos.then((result) =>{ return result});
    const random = Math.floor(Math.random() * produtxt.length)
    response.send(produtxt[random]);
})

app.use('*', function (req, response, next) {response.send("<h1>Página no encontrada</h1>")})

const server = app.listen(PORT, () => {
    console.log(`Server conected on ${PORT}`)
})

server.on('error', error => console.log('Error en el servidor', error))