import { Router } from "express"
import { buscar } from "../controllers/buscar.controller.js"

const buscarRouter = Router()

buscarRouter.get('/:coleccion/:termino', buscar)

export default buscarRouter
