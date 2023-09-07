import jwt from "jsonwebtoken"
import { Usuario } from "../models/usuario.js"

export const validarJWT = async ( req, res, next) => {

  const token =  req.header('x-token')


  if( !token ) {
    return res.status(401).json({
      msg: 'No tienes permisos'
    })
  }

  try {

    const { uid }= jwt.verify( token, process.env.SECRETORPRIVATEKEY )

    const usuario = await Usuario.findById( uid )

    // Verificar si el usuario tiene el estado en true

    if( !usuario ) {
      return res.status(401).json({
        msg: 'No tienes permisos'
      })
    }
    
    if( !usuario.estado ) {
      return res.status(401).json({
        msg: 'No tienes permisos'
      })
    }

    
    req.usuario = usuario 
    next()
  } catch(err) {
    console.log(err)
    res.status(401).json({
      msg: 'Token invalido'
    })
  }

}




