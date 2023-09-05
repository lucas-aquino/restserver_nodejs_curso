import { Router } from "express"
import { 
  usuariosGET, 
  usuariosPUT, 
  usuariosPOST,
  usuariosDELETE,
  usuariosPATCH 
} from "../controllers/usuarios.controller.js"
import { check } from "express-validator"
import { validarCampos} from "../middlewares/validar-campos.js"
import { correoExiste, esRolValido, usuarioExiste, usuarioExistePorID } from "../helpers/db-validators.js"


const usuariosRoutes = Router()

usuariosRoutes.get('/', [
  check('limite', 'El limite tiene que ser un numero').isNumeric(),
  check('desde', 'desde tiene que ser un numero').isNumeric(),
  validarCampos
], usuariosGET )

usuariosRoutes.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( usuarioExistePorID ),
  check('rol').custom( esRolValido ),
  check('usuario').custom( usuarioExiste ),
  validarCampos
], usuariosPUT)

usuariosRoutes.post('/', [
  check('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('usuario').custom( usuarioExiste ),
  check('password', 'La contraseña tiene que tener mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( correoExiste ),
  check('rol').custom( esRolValido ),
  validarCampos
], usuariosPOST)


usuariosRoutes.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( usuarioExistePorID ),
  validarCampos
], usuariosDELETE)

usuariosRoutes.patch('/', usuariosPATCH)

export default usuariosRoutes