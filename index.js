const Contenedor = require("./Contenedor.js")


const p1 = {
    title: "Ten",
    price: 16700,
    thumbnail: 'lol'
}

const p2 = {
    title: 'superunknown',
    price: 14500,
    thumbnail: 'lol'
}

const p3 = {
    title: 'dirt',
    price: 15100,
    thumbnail: 'lol'
}

async function cualquierNombre() {
    const productos = new Contenedor('./productos.txt')
    // await productos.save(p3)
    
    let productoPorId = await productos.getById(2)
    console.log("Producto con la id introducida:\n", JSON.stringify(productoPorId))

    let todosLosProductos = await productos.getAll()
    console.log("Lista completa de productos:\n", JSON.stringify(todosLosProductos))

    // await productos.deleteById(2)

    // await productos.deleteAll()
    // console.log('muestro todo')
    // let objs = await productos.getAll();
    // console.log(objs);
}

cualquierNombre()