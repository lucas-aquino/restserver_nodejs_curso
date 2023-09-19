import { Router } from "express"
import { check, param } from "express-validator"
import { actualizarProducto, borrarProducto, crearProducto, obtenerProductos } from "../controllers/productos.controller.js"
import { validarCampos, validarJWT, tieneRol } from "../middlewares/index.js"
import { productoExistePorID } from "../helpers/db-validators.js"


const productosRouter = Router()

//Obtener todos los productos
productosRouter.get('/', [
  validarCampos
], obtenerProductos)

//Obtener el producto por su id
productosRouter.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  param('limite', 'El limite tiene que ser un numero').optional().isNumeric(),
  param('desde', 'desde tiene que ser un numero').optional().isNumeric(),
  validarCampos
], obtenerProductos)

//Crear Producto
productosRouter.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearProducto)

// Borrar Producto
productosRouter.delete('/:id', [
  validarJWT,
  tieneRol('ADMIN_ROL'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id', 'El id es obligatorio').not().isEmpty(),
  check('id').custom( productoExistePorID ),
  validarCampos
], borrarProducto)

// Actualizar Producto
productosRouter.put('/:id', [
  validarJWT,
  tieneRol('ADMIN_ROL'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id', 'El id es obligatorio').not().isEmpty(),
  check('id').custom( productoExistePorID ),
  validarCampos
], actualizarProducto)

export default productosRouter




