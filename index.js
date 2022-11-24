class Contenedor {
    constructor(filename) {
        this.filename = filename;
    }

    fs = require("fs")

    async save(Object) {
        try {
            await this.fs.promises.writeFile(this.filename, JSON.stringify([]));
            let data = JSON.parse(await this.fs.promises.readFile(this.filename, "utf-8"));
            // data = JSON.parse(data)
            console.log(data.length)
            Object = { ...Object, id: data.length + 1 };
            data.push(Object);
            await this.fs.promises.writeFile(this.filename, JSON.stringify(data));
        } catch (error) {

        }
    }

    async getById(Number) {
        try {
            let data = JSON.parse(await this.fs.promises.readFile(this.filename, "utf-8"))
            const resultado = data.find((el) => el.id === Number)
            return resultado
        } catch (error) {

        }
    }

    async getAll() {
        try {
            let data = JSON.parse(await this.fs.promises.readFile(this.filename, "utf-8"))
            return data;
        } catch (error) {

        }
    }

    async deleteById(Number) {
        try {
            let data = JSON.parse(await this.fs.promises.readFile(this.filename, "utf-8"))
            const resultado = data.filter((el) => el.id !== Number)
            await this.fs.promises.writeFile("productos2.txt", JSON.stringify(resultado))
        } catch (error) {

        }
    }

    async deleteAll() {
        try {
            let data = JSON.parse(await this.fs.promises.readFile(this.filename, "utf-8"))
            data = []
            await this.fs.promises.writeFile("productos3.txt", JSON.stringify(data))
        } catch (error) { }
    }

}

const newfile = new Contenedor("productos.txt")

// newfile.save({name:"Traumdeutung",price:9,image:"traume.jpg",id:1})
// newfile.save({name:"Entwurf",price:15,image:"entwurf.jpg",id:2})

const processfile = async () => {
    let product = await newfile.getById(2)
    console.log(product)
    let everything = await newfile.getAll()
    console.log(everything)
}

processfile();

newfile.deleteById(1)
newfile.deleteAll()


