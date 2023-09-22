import { response } from "express"
import { 
  extensionesSoportadas, 
  subirArchivo 
} from "../helpers/subir-archivo.js"


export const cargarArchivo = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: 'No hay archivos para subir'
    })
  }

  await subirArchivo(req.files, extensionesSoportadas.img, 'img')
    .then((nombre) => res.json({
      nombre
    }))
    .catch((msg) => res.status(400).json({
      msg
    }))

}



export const actualizarImage = async (req, res = response) => {
  const { id, coleccion } = req.params


  res.json({
    msg: 'updated'
  })
}



