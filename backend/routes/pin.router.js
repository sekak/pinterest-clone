import express from 'express'
import { getPins, getPin, createPin } from '../controlles/pin.controlles.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/', getPins)
router.get('/:id', getPin)
router.post('/create', verifyToken, createPin)

export default router