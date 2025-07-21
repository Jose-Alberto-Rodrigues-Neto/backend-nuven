import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storagePath = path.resolve('armazenamento')

if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, storagePath)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['text/csv', 'application/pdf']

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Apenas arquivos .csv e .pdf são permitidos'), false)
    }
}

const upload = multer({ storage, fileFilter })

export default upload