import { response } from "express";
import { Categoria } from "../models/index.js";

export const obtenerCategoria = async (req, res = response) => { 

  const { id } = req.params

  const {
    limite = 5,
    desde = 0
  } = req.query
  
  const filters = {
    estado: true
  }

  const populateFilter = {
    usuario: 1,
    nombre: 1,
    correo: 1
  }
  
  if( !id ) {
    const [ total, categorias ] = await Promise.all([
      Categoria.countDocuments(filters),
      Categoria.find(filters)
        .populate('usuario', populateFilter)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
  
    return res.json({
      total,
      categorias
    })
  }
  
  const categoria  = await Categoria.findById(id)
    .populate('usuario', populateFilter)

  if( !categoria || !categoria.estado){
    return res.status(404).json({
      msg: 'No se encontro la categoria'
    })
  }

  res.json({
    categoria
  })
}

export const crearCategoria = async (req, res = response) => {


  const nombre = req.body.nombre.toUpperCase()

  const categoriaDB = await Categoria.findOne({ nombre })

  if( categoriaDB ){
    return res.status(400).json({
      msg: `La categoria ${ categoriaDB } ya se uso`
    })
  }

  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = new Categoria( data )

  await categoria.save()

  res.status(201).json( categoria )
}

export const actualizarCategoria = async (req, res = response) => {

  const { id } = req.params

  const { _id, usuario, estado, ...data } = req.body

  data.nombre = data.nombre.toUpperCase()
  data.usuario = req.usuario._id

  const categoria = await Categoria.findByIdAndUpdate(id, data)

  res.json({
    categoria
  })
}

export const borrarCategoria = async (req, res = response) => {

  const { id } = req.params

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false })
  const usuarioAutenticado = req.usuario

  res.json({
    categoria,
    usuarioAutenticado
  })
}
