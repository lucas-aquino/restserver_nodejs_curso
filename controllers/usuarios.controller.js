import { response } from "express"

export const usuariosGET = (req, res = response) => {


  const { q, nombre, apikey } = req.query

  res.json({
    msg: 'Hola GET :D - controller',
    q, 
    nombre, 
    apikey
  })
}

export const usuariosPUT = (req, res = response) => {

  const { id } = req.params

  res.json({
    msg: 'Hola PUT :D - controller',
    id
  })
}
export const usuariosPOST = (req, res = response) => {

  const { nombre, edad } = req.body

  res.json({
    msg: 'Hola POST :D - controller',
    nombre,
    edad
  })
}
export const usuariosDELETE = (req, res = response) => {
  res.json({
    msg: 'Hola DELETE :D - controller'
  })
}
export const usuariosPATCH = (req, res = response) => {
  res.json({
    msg: 'Hola PATCH :D - controller'
  })
}
