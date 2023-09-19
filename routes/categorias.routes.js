import { Router } from "express";
import { check, param } from "express-validator";
import { 
  tieneRol,
  validarCampos 
} from "../middlewares/index.js";
import { 
  borrarCategoria, 
  obtenerCategoria, 
  crearCategoria, 
  actualizarCategoria 
} from "../controllers/categorias.controller.js";
import { usuarioExiste, categoriaExistePorID } from "../helpers/db-validators.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const categoriasRouter = Router()

//Obtener todas las categorias - publico
categoriasRouter.get('/', [
  validarCampos
], obtenerCategoria)

//Obtener la categoria por id - publico
categoriasRouter.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  param('limite', 'El limite tiene que ser un numero').optional().isNumeric(),
  param('desde', 'desde tiene que ser un numero').optional().isNumeric(),
  validarCampos
], obtenerCategoria)

//Crear categoria - privado - persona con token valido
categoriasRouter.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

//Actualizar categoria - privado - persona con token valido
categoriasRouter.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un ID valido').isMongoId(),
  check('id', 'El id es obligatorio').not().isEmpty(),
  check('id').custom( categoriaExistePorID ),
  validarCampos
], actualizarCategoria)

// Borrar Categoria - Admin
categoriasRouter.delete('/:id', [
  validarJWT,
  tieneRol('ADMIN_ROL'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id', 'El id es obligatorio').not().isEmpty(),
  check('id').custom( categoriaExistePorID ),
  validarCampos
], borrarCategoria)



export default categoriasRouter
