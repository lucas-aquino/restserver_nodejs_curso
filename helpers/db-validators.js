import { Rol } from "../models/rol.js"
import { 
  Usuario, 
  Categoria, 
  Producto
} from "../models/index.js"

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
    throw new Error(`El Usuario no existe`)
  }
}

export const categoriaExistePorID = async (id = '') => {
  const existeCategoria = await Categoria.findById(id)
  
  if( !existeCategoria ){
    throw new Error(`La catetgoria no existe`)
  }
}

export const productoExistePorID = async (id = '') => {
  const existeProducto = await Producto.findById(id)
  
  if( !existeProducto ){
    throw new Error(`La producto no existe`)
  }
}


export const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes( coleccion )

  if( !incluida ) {
    throw new Error(`La coleccion ${ coleccion } no permitida`)
  }

  return true
}