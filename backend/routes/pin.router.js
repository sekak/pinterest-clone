import express from 'express'
import { getPins, getPin } from '../controlles/pin.controlles.js'

const router = express.Router()

router.get('/', getPins)
router.get('/:id', getPin)

export default router