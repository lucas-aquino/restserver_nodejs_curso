import express from 'express'
import cors from 'cors'
import { dbConnection } from '../database/config.js'
import usuariosRoutes from '../routes/usuarios.routes.js'
import authRouter from '../routes/auth.routes.js'
import categoriasRouter from '../routes/categorias.routes.js'

export default class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000


    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      categorias: '/api/categorias'
    }


    // Conectar a base de datos
    this.conectarDB()

    //Middlewares
    this.middlewares()

    //Rutas App
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {

    // CORS
    this.app.use( cors() )

    // Formato lectura de body
    this.app.use( express.json() )

    // Directorio publico
    this.app.use( express.static('public') )

  }

  routes() {
    
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.usuarios, usuariosRoutes)
    this.app.use(this.paths.usuarios, categoriasRouter)
    
  }

  listen() {
    

    this.app.listen(this.port, () => {
      console.log(`Server on port ${ this.port }`)
    })    
  }

}

