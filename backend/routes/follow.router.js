import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { addFollow } from '../controlles/follow.controlles.js'

const router = express.Router()

router.get('/:userId', verifyToken , addFollow)

export default router