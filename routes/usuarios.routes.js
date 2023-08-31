import { Router } from "express"
import { 
  usuariosGET, 
  usuariosPUT, 
  usuariosPOST,
  usuariosDELETE,
  usuariosPATCH 
} from "../controllers/usuarios.controller.js"


const usuariosRoutes = Router()

usuariosRoutes.get('/', usuariosGET )

usuariosRoutes.put('/:id', usuariosPUT)

usuariosRoutes.post('/', usuariosPOST)

usuariosRoutes.delete('/', usuariosDELETE)

usuariosRoutes.patch('/', usuariosPATCH)

export default usuariosRoutes