import { Schema, model } from "mongoose"


const UsuarioSchema = Schema({
  usuario: {
    type: String,
    require: [true, 'El nombre de usuario es obligatorio'],
    unique: true
  },
  nombre: {
    type: String
  },
  correo: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    require: true,
    enum: ['ADMIN_ROL', 'USER_ROL']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, password, ...usuario } = this.toObject()

  usuario.uid = _id
  
  return usuario
}

export const Usuario = model('Usuario', UsuarioSchema)
