import { response } from "express";
import { isValidObjectId } from "mongoose";
import { Categoria, Producto, Usuario } from "../models/index.js";
import { ResultWithContextImpl } from "express-validator/src/chain/context-runner-impl.js";


const coleccionesPermitidas = [
  'usuarios',
  'categorias',
  'productos',
  'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

  const esMongoID = isValidObjectId( termino )

  if( esMongoID ) {
    const usuario = await Usuario.findById(termino)

    return res.json({
      results: ( usuario ) ? [ usuario ] : []
    })
  }

  const regex = new RegExp( termino, 'i' )

  const usuarios = await Usuario.find({ 
    $or: [
      { nombre: regex },
      { correo: regex },
      { usuario: regex },
    ],
    $and: [{ estado: true }] //TODO: usar esto para el controlador de producto y categoria 
  })

  res.json({
    results: usuarios
  })
}


//La categoria se puede buscar por:
// - por id
// - por el nombre
const buscarCategoria = async (termino, res = response) => {

  const esMongoID = isValidObjectId(termino)

  if( esMongoID ) {
    const categoria = await Categoria.findById(termino)
      .populate('usuario')

    return res.json({
      results: ( categoria ) ? [ categoria ] : []
    })
  }

  const regex = new RegExp( termino, 'i' )

  const categorias = await Categoria.find({
    nombre: regex,
    $and : [{ estado: true }]
  }).populate('usuario')

  res.json({
    results: categorias
  })

}


const buscarProductos = async (termino, res = response) => {

  const esMongoID = isValidObjectId(termino)

  if( esMongoID ) {
    const producto = await Producto.findById(termino)
      .populate('categoria')
      .populate('usuario')
      
      return res.json({
        results: ( producto ) ? [ producto ] : []
      })
    }
    
    const regex = new RegExp( termino, 'i' )
    
    const productos = await Producto.find({ 
      $or: [
        { nombre: regex },
        { descripcion: regex },
      ],
      $and: [{ estado: true }] //TODO: usar esto para el controlador de producto y categoria 
    }).populate('categoria')
    .populate('usuario')

  res.json({
    results: productos
  })

}

export const buscar = async (req, res = response) => {

  const { coleccion, termino } = req.params

  if( !coleccionesPermitidas.includes( coleccion ) ) {
    return res.status(400).json({
      msg: 'No exite la coleccion'
    })
  }

  if(coleccion === 'usuarios') {
    return await buscarUsuarios(termino, res)
  }

  if(coleccion === 'categorias') {
    return await buscarCategoria(termino, res)
  }

  if(coleccion === 'productos') {
    return await buscarProductos(termino, res)
  }

  res.status(500).json({
    msg: 'Esa busqueda no esta implementada'
  })
}





