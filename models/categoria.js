import { Schema, model } from "mongoose";


const CategoriaSchema = Schema({
  nombre: {
    type: String,
    require: [
      true,
      'El nombre es obligatorio'
    ],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  }
})

CategoriaSchema.methods.toJSON = function () {
  const { __v, ...categoria} = this.toObject()

  return categoria
}

export const Categoria = model('Categoria', CategoriaSchema) 


