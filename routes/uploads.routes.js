import { Router } from "express";
import { check } from "express-validator";
import { actualizarImage, cargarArchivo } from "../controllers/uploads.controller.js";
import { 
  validarJWT, 
  validarCampos 
} from "../middlewares/index.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";

const uploadsRouter = Router()


uploadsRouter.post('/',[
  validarJWT,
  validarCampos,
], cargarArchivo)

uploadsRouter.put('/:coleccion/:id',[
  validarJWT,
  check('id', 'No es un ID valido').isMongoId(),
  check('id', 'El id es obligatorio').not().isEmpty(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos,
], actualizarImage)



export default uploadsRouter



