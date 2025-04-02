import express from 'express'
import { getPins, getPin, createPin, interactionPin, interaction } from '../controlles/pin.controlles.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/', getPins)
router.get('/:id', getPin)
router.post('/create', verifyToken, createPin)
router.get('/interaction-pin/:id', interactionPin)
router.post('/interaction/:id', verifyToken, interaction)

export default router