const Producto = require("../Models/Producto");

//POST
exports.crearProducto = async (req, res) => {
    try {
        let producto;
        //Creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save()
        res.send(producto);

    } catch (error) {
        console.log(error);
        req.status(500).send('Error')
    }

}

//GET ALL
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        req.status(500).send('Error')
    }
}

//PUT
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        producto.nombre = nombre
        producto.categoria = categoria
        producto.ubicacion = ubicacion
        producto.precio = precio

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true })

        res.json(producto);

    } catch (error) {
        console.log(error);
        req.status(500).send('Error')
    }
}

//GET ONE
exports.obtenerProductoUnico = async (req, res) => {
    try {

        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        res.json(producto);

    } catch (error) {
        console.log(error);
        req.status(500).send('Error')
    }
}

//DELETE
exports.eliminarProducto = async (req, res) => {
    try {

        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        await Producto.findOneAndRemove({ _id: req.params.id })


        res.json({ msg: 'Producto eliminado' });

    } catch (error) {
        console.log(error);
        req.status(500).send('Error')
    }
}