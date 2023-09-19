import express from 'express'
import cors from 'cors'
import { dbConnection } from '../database/config.js'
import usuariosRoutes from '../routes/usuarios.routes.js'
import authRouter from '../routes/auth.routes.js'
import categoriasRouter from '../routes/categorias.routes.js'
import productosRouter from '../routes/productos.routes.js'
import buscarRouter from '../routes/buscar.routes.js'

export default class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000


    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      usuarios: '/api/usuarios',
      productos: '/api/productos',
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
    this.app.use(this.paths.buscar, buscarRouter)
    this.app.use(this.paths.categorias, categoriasRouter)
    this.app.use(this.paths.usuarios, usuariosRoutes)
    this.app.use(this.paths.productos, productosRouter)
    
  }

  listen() {
    

    this.app.listen(this.port, () => {
      console.log(`Server on port ${ this.port }`)
    })    
  }

}

