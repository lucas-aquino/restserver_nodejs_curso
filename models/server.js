import express from 'express'
import cors from 'cors'
import usuariosRoutes from '../routes/usuarios.routes.js'
import { dbConnection } from '../database/config.js'

export default class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000

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
    
    this.app.use('/api/usuarios', usuariosRoutes)
    
  }

  listen() {
    

    this.app.listen(this.port, () => {
      console.log(`Server on port ${ this.port }`)
    })    
  }

}

