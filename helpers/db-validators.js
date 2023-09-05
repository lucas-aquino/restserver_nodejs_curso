import { Rol } from "../models/rol.js"
import { Usuario } from "../models/usuario.js"

export const esRolValido = async (rol = '') => {
  const existeRol = await Rol.findOne({ rol })
  if( !existeRol ){
    throw new Error(`El rol '${ rol }' no existe`)
  }
}

export const correoExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo })

  if( existeEmail ){
    throw new Error(`El correo '${ correo }' ya se uso`)
  }
}

export const usuarioExiste = async (usuario = '') => {
  const existeUsuario = await Usuario.findOne({ usuario })

  if( existeUsuario ){
    throw new Error(`El usuario '${ usuario }' ya se uso`)
  }
}


export const usuarioExistePorID = async (id = '') => {
  const existeUsuario = await Usuario.findById(id)

  if( !existeUsuario ){
    throw new Error(`El id '${ id }' no existe`)
  }
}