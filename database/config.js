import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {


    await mongoose.connect( process.env.MDB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('CONECCION Establecida Correctamente')

  } catch (err) {
    console.log(`ERROR de conexion con la base de datos: ${err}`)
  }
}


