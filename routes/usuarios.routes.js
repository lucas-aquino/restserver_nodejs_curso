import { Router } from "express"

import { 
  validarCampos, 
  validarJWT, 
  esAdmin, 
  tieneRol 
} from "../middlewares/index.js"

import { 
  obtenerUsuarios, 
  actualizarUsuario, 
  crearUsuario,
  borrarUsuario,
  usuariosPATCH 
} from "../controllers/usuarios.controller.js"
import { check, param } from "express-validator"
import { 
  correoExiste, 
  esRolValido, 
  usuarioExiste, 
  usuarioExistePorID 
} from "../helpers/db-validators.js"


const usuariosRoutes = Router()

usuariosRoutes.get('/', [
  param('limite', 'El limite tiene que ser un numero').optional().isNumeric(),
  param('desde', 'desde tiene que ser un numero').optional().isNumeric(),
  validarCampos
], obtenerUsuarios )

usuariosRoutes.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( usuarioExistePorID ),
  check('rol').custom( esRolValido ),
  check('usuario').custom( usuarioExiste ),
  validarCampos
], actualizarUsuario)

usuariosRoutes.post('/', [
  check('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('usuario').custom( usuarioExiste ),
  check('password', 'La contraseña tiene que tener mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( correoExiste ),
  check('rol').custom( esRolValido ),
  validarCampos
], crearUsuario)


usuariosRoutes.delete('/:id', [
  validarJWT,
  //esAdmin,
  tieneRol('ADMIN_ROL'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( usuarioExistePorID ),
  validarCampos
], borrarUsuario)

usuariosRoutes.patch('/', usuariosPATCH)

export default usuariosRoutes