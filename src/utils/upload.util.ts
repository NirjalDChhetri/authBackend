import { Uploaded } from 'express-fileupload'
import path from 'path'
import fs from 'fs'

const PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', 'public')
const UPLOADS_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'temp')

