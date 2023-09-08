import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { login, googleSignIn } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login)

authRouter.post('/google', [
  check('id_token', 'id_token es necesario').not().isEmpty(),
  validarCampos
], googleSignIn)

export default authRouter
