const fs = require('fs')

class Contenedor {
    constructor(path) {
        this.fileName = path;
        this.productos = []
    }

    async save(obj) {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            this.productos = data
            const onlyIds = this.productos.map((producto) => producto.id)
            const largestId = Math.max.apply(Math, onlyIds)
            const id = largestId + 1
            obj = {id, ...obj}
            this.productos.push(obj)
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productos))
        } catch {
            console.log('No se pudo abrir, creando archivo nuevo')
            try {
                const id = 1;
                obj = {id, ...obj}
                this.productos.push(obj)
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.productos))
            } catch (error) {
                console.log('No se pudo escribir el archivo', error)
            }
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            const objectWithId = data.find((producto) => producto.id == id)
            if(objectWithId === undefined) {
                console.log("No se encontró el producto con el id indicado");
                const mensaje = "Producto no encontrado"
                return mensaje
            } else {
                return objectWithId
            }
            
        } catch (error) {
            console.log('No se pudo acceder a los datos', error)
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf8')
            data = JSON.parse(data)
            return data
        } catch (error) {
            console.log('No se pudo acceder al archivo', error)
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            const minusOne = data.filter((producto) => producto.id != id)
            fs.promises.writeFile(this.fileName, JSON.stringify(minusOne))
        } catch (error) {
            console.log('No se encontró el producto con el id indicado', error);
        }
    }

    async deleteAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            data = []
            fs.promises.writeFile(this.fileName, JSON.stringify(data))
        } catch (error) {
            console.log('No se pudo continuar la operación', error)
        }
    }
}

module.exports = Contenedor