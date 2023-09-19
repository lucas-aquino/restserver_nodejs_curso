import { request, response } from "express";
import { Categoria, Producto } from "../models/index.js";

//Optener productos
export const obtenerProductos = async (req = request, res = response) => {

  const { id } = req.params

  const {
    limite = 5,
    desde = 0
  } = req.query

  const filters = {
    estado: true
  }

  const populteFilter = {
    usuario: {
      nombre: 1,
      usuario: 1,
      correo: 1
    },
    categoria: {
      nombre: 1
    }
  }

  // Devuelve todos los productos si no le pasan el id
  if( !id ) {
    const [ total, productos ] = await Promise.all([
      Producto.countDocuments(filters),
      Producto.find(filters)
        .populate('usuario', populteFilter.usuario)
        .populate('categoria', populteFilter.categoria)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    const resultado = productos.length

    return res.json({
      total,
      resultado,
      productos
    })
  }

  const producto = await Producto.findById(id)
    .populate('usuario', populteFilter.usuario)
    .populate('categoria', populteFilter.categoria)

  if( !producto || !producto.estado ) {
    return res.status(404).json({
      msg: 'El producto no existe'
    })
  }

  res.json({
    producto
  })
}

//Crear producto
export const crearProducto = async (req, res = response) => {

  
  const { ...body } = req.body

  const nombre = body.nombre.toUpperCase()
  const categoria = body.categoria.toUpperCase()
  
  const productoDB = await Producto.findOne({ nombre })
  const categoriaDB = await Categoria.findOne({ nombre: categoria })

  if( productoDB ){
    return res.status(400).json({
      msg: `El producto '${ req.body.nombre }' ya existe`
    })
  }

  if( !categoriaDB ){
    return res.status(404).json({
      msg: `La categoria '${ req.body.categoria }' no existe`
    })
  }

  const data = {
    ...body,
    nombre,
    categoria: categoriaDB._id,
    usuario: req.usuario._id
  }

  const producto = new Producto( data )

  await producto.save()


  res.status( 201 ).json({ 
    producto 
  })
  
}

// Borrar producto
export const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params

  const producto = await Producto.findByIdAndUpdate(id, { estado: false })
  const usuarioAutenticado = req.usuario

  res.json({
    producto,
    usuarioAutenticado
  })
}

// Actualizar Producto
// BODY -> verificar que existe la categoria
export const actualizarProducto = async (req = request, res = response) => {

  const { id } = req.params


  const { _id, usuario, estado, ...data} = req.body

  if( data.categoria ){
    data.categoria = req.body.categoria.toUpperCase()
    
    const categoriaDB = await Categoria.findOne({ nombre: data.categoria })
  
    if( !categoriaDB ) {
      return res.status(404).json({
        msg: 'La categoria no existe'
      })
    }
  
    data.categoria = categoriaDB?._id
  }

  if( data.nombre ){
    data.nombre = data.nombre?.toUpperCase()
  }
  
  data.usuario = req.usuario._id

  const producto = await Producto.findByIdAndUpdate(id, data)

  res.json(producto)
}