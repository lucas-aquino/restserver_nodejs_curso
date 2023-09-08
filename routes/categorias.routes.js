import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { categoriasGET } from "../controllers/categorias.controller.js";


const categoriasRouter = Router()


categoriasRouter.get('/', [
  validarCampos
], categoriasGET)



export default categoriasRouter
