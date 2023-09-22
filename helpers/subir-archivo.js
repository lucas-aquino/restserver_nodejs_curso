import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const extensionesSoportadas = {
  img: [
    'png', 
    'jpg', 
    'jpeg', 
    'gif'
  ],
  texto: [
    'txt',
    'md'
  ]
}

export const subirArchivo = ( files, extensionesValidas = [], carpeta = '') => new Promise( (resolve, reject) => {
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { archivo } = files
  const nombreCortado = archivo.name.split('.')
  const extension = nombreCortado[ nombreCortado.length - 1]

  if ( !extensionesValidas.includes( extension ) ) {
    return reject(`La extension '.${ extension }' no es soportada(${ extensionesValidas })`)
  }
  
  const nombre = `${uuidv4()}.${extension}`
  const uploadPath = path.join(__dirname, '../uploads', carpeta, nombre)

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return reject(err)
    }

    resolve( nombre )
  })

})