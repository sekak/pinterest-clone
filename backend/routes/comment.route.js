import express from 'express'
import { getComments, createComment } from '../controlles/comment.controlles.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/', getComments)
router.post('/create',verifyToken , createComment)

export default router