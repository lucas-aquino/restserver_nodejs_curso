import { response } from "express"
import { Usuario } from "../models/usuario.js"
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/generar-jwt.js"


export const login = async ( req, res = response ) => {

  const {
    correo,
    password
  } = req.body


  try {

    // Verficar si el email existe 

    const usuario = await Usuario.findOne({ correo })

    // Verificar si el correo es correcto

    if( !usuario ) {
      return res.status(400).json({
        msg: 'Usuario o correo no son correctos - correo' // Esto es para test luego se saca
      })
    }
    
    // Si el usuario esta activo
    
    if( !usuario.estado ) {
      return res.status(400).json({
        msg: 'Usuario o correo no son correctos - usuario estado false'// Esto es para test luego se saca
      })
    }
    
    // verificar si la contraseña es correcta
    
    const validPass = bcrypt.compareSync(password, usuario.password)
    
    if( !validPass ) {
      return res.status(400).json({
        msg: 'Usuario o correo no son correctos - password' // Esto es para test luego se saca
      })
    }

    // generar el jwt
    const token = await generarJWT( usuario.id )


    res.json({
      usuario,
      token
    })

  } catch (err) {
    console.log(err)
    
    res.status(500).json({
      msg: 'Algo salio mal, por favor contacte con el administrador'
    })
  }



}


