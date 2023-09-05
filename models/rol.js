import { Schema, model } from "mongoose";


const RolSchema = Schema({
  rol: {
    type: String,
    require: [true, 'El rol es obligatorio']
  }
}) 

export const Rol = model('Rol', RolSchema)

