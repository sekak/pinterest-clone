import express from 'express'
import { getUser } from '../controlles/user.controller.js'

const router = express.Router()

router.get('/:username', getUser)

export default router