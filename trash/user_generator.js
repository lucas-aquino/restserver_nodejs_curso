import { response } from "express"
import { Usuario } from "../models/usuario.js"
import bcrypt from "bcryptjs"


export const usuariosGeneratorTest = async (req, res = response) => {

  const usuariosTest = [
    {
      "usuario": "lucas-aquino",
      "nombre": "Lucas Aquino",
      "correo": "lucas_aquino@mail.com",
      "password": "lucasaquino",
      "rol": "USER_ROL"
    },
    {
      "usuario": "lellicott0",
      "nombre": "Lynnet Ellicott",
      "correo": "lellicott0@aboutads.info",
      "password": "oQ2?OQ72&qq/",
      "rol": "USER_ROL"
    },
    {
      "usuario": "cbarrat1",
      "nombre": "Curr Barrat",
      "correo": "cbarrat1@hatena.ne.jp",
      "password": "gQ9{Hn5\\SS=NS_",
      "rol": "USER_ROL"
    },
    {
      "usuario": "eciccottio2",
      "nombre": "Enos Ciccottio",
      "correo": "eciccottio2@godaddy.com",
      "password": "dI5@(k_i",
      "rol": "USER_ROL"
    },
    {
      "usuario": "cknights3",
      "nombre": "Costanza Knights",
      "correo": "cknights3@technorati.com",
      "password": "nV2?qM{'m'dHY",
      "rol": "USER_ROL"
    },
    {
      "usuario": "lquarmby4",
      "nombre": "Linnie Quarmby",
      "correo": "lquarmby4@gizmodo.com",
      "password": "rI0{N&`3_r(Y@,",
      "rol": "USER_ROL"
    },
    {
      "usuario": "mofihillie5",
      "nombre": "Martyn O'Fihillie",
      "correo": "mofihillie5@wikia.com",
      "password": "bL7/p=*i",
      "rol": "USER_ROL"
    },
    {
      "usuario": "dtigwell6",
      "nombre": "Dena Tigwell",
      "correo": "dtigwell6@adobe.com",
      "password": "qO3(Vi=!v>8BMl5Z",
      "rol": "USER_ROL"
    },
    {
      "usuario": "bizhaky7",
      "nombre": "Berkly Izhaky",
      "correo": "bizhaky7@twitpic.com",
      "password": "eN8$vXdA",
      "rol": "USER_ROL"
    },
    {
      "usuario": "gdimmack8",
      "nombre": "Giselbert Dimmack",
      "correo": "gdimmack8@themeforest.net",
      "password": "gM1%5qOr|",
      "rol": "USER_ROL"
    },
    {
      "usuario": "tfeasley9",
      "nombre": "Timoteo Feasley",
      "correo": "tfeasley9@irs.gov",
      "password": "aV6#cR2m)I",
      "rol": "USER_ROL"
    },
    {
      "usuario": "amca",
      "nombre": "Ania Mc Combe",
      "correo": "amca@technorati.com",
      "password": "tF9*Q<ioUvvq$G",
      "rol": "USER_ROL"
    },
    {
      "usuario": "azmitrovichb",
      "nombre": "Andre Zmitrovich",
      "correo": "azmitrovichb@bbc.co.uk",
      "password": "qM7,vxhUeApgg%_",
      "rol": "USER_ROL"
    },
    {
      "usuario": "owheelwrightc",
      "nombre": "Otho Wheelwright",
      "correo": "owheelwrightc@cocolog-nifty.com",
      "password": "cR2_@)&xDu}c*J",
      "rol": "USER_ROL"
    },
    {
      "usuario": "dcharlsond",
      "nombre": "Daryn Charlson",
      "correo": "dcharlsond@indiegogo.com",
      "password": "eH6=}qKWGg@yC3@0",
      "rol": "USER_ROL"
    },
    {
      "usuario": "askillanderse",
      "nombre": "Adriane Skillanders",
      "correo": "askillanderse@goo.gl",
      "password": "fE5%k_Kk6{IpC8x",
      "rol": "USER_ROL"
    },
    {
      "usuario": "sborthramf",
      "nombre": "Sabrina Borthram",
      "correo": "sborthramf@amazon.co.jp",
      "password": "sL0$f\"cE*?rmR",
      "rol": "USER_ROL"
    },
    {
      "usuario": "cbizleyg",
      "nombre": "Celle Bizley",
      "correo": "cbizleyg@engadget.com",
      "password": "qE4\\+~hU?1NH",
      "rol": "USER_ROL"
    },
    {
      "usuario": "lreedersh",
      "nombre": "Lonee Reeders",
      "correo": "lreedersh@dell.com",
      "password": "mY4`r8p`h",
      "rol": "USER_ROL"
    },
    {
      "usuario": "cravenshawi",
      "nombre": "Clyde Ravenshaw",
      "correo": "cravenshawi@twitter.com",
      "password": "pQ8@BXP6kA",
      "rol": "USER_ROL"
    },
    {
      "usuario": "ggoudyj",
      "nombre": "Gabriell Goudy",
      "correo": "ggoudyj@altervista.org",
      "password": "iP3/'5u*",
      "rol": "USER_ROL"
    }
  ]

  usuariosTest.forEach(async (usuarioTest) => {

    const {
      usuario, 
      nombre, 
      correo, 
      password, 
      rol
    } = usuarioTest
  
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

  })

  res.json({
    msg: 'Se creo el usuario'
  })
}
