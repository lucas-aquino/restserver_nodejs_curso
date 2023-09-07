import { response } from "express"
import { Usuario } from "../models/usuario.js"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"

export const usuariosGET = async (req, res = response) => {


  const {
    limite = 5,
    desde = 0
  } = req.query

  const filters = { 
    estado: true
  }

  const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments(filters),
    Usuario.find(filters)
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  const totalDevuelto = usuarios.length

  res.json({
    total,
    totalDevuelto,
    usuarios
  })
}

export const usuariosPUT = async (req, res = response) => {

  const { id } = req.params
  const { _id, password, google, correo, usuario, ...resto } = req.body

  if( password ){
    const salt = bcrypt.genSaltSync()
    
    resto.password = bcrypt.hashSync( password, salt )
  }

  if( correo ) {
    resto.correo = correo
  } 

  if( usuario ) {
    resto.usuario = usuario
  } 
  
  const usuarioDB = await Usuario.findByIdAndUpdate( id, resto )

  res.json({ usuarioDB })
}
export const usuariosPOST = async (req, res = response) => {

  const {
    usuario, 
    nombre, 
    correo, 
    password, 
    rol
  } = req.body

  const usuarioModel = new Usuario({
    usuario, 
    nombre, 
    correo, 
    password, 
    rol
  })

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync()

  usuarioModel.password = bcrypt.hashSync( password, salt )

  //Guardar en DB
  await usuarioModel.save()

  res.json({
    msg: 'Se creo el usuario',
    usuarioModel
  })
}

export const usuariosDELETE = async (req, res = response) => {
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

  const usuarioAutenticado = req.usuario

  
  res.json({
    usuario,
    usuarioAutenticado
  })
}

export const usuariosPATCH = (req, res = response) => {
  res.json({
    msg: 'Hola PATCH :D - controller'
  })
}
