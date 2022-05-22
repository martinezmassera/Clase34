const fs = require('fs');
let idCount = 1
const productos = [];
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo

    }

    getFullName() {
        console.log(productos)
    }


    save(titulo, precio, thun) {
        const id = idCount++;
        try {
            productos.push({ id, titulo, precio, thun })
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
        } catch (err) {
            console.log('error')
        }
    }

    getById(number) {
        console.log(productos.find(id => id.id === number))
    }

    async getAll() {
        try {
            const datos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const obj = JSON.parse(datos);
            return obj
        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(number) {
        try {
            const datos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const obj = JSON.parse(datos);
            const deleteId = obj.filter(prod => prod.id !== number);
            console.log(deleteId)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(deleteId, null, '\t'))
        } catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            const datos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const obj = JSON.parse(datos);
            console.log(obj.length)
            const deleteAll = obj.splice(0, obj.length)
            console.log(obj)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(obj, null, '\t'))
        } catch (err) {
            console.log(err)
        }

    }

}

module.exports = Contenedor