import express from 'express'
import { getBoards } from '../controlles/board.controlles.js'

const router = express.Router()

router.get('/:userId', getBoards)

export default router