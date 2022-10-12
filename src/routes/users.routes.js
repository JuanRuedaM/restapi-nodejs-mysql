import { Router } from "express";
import {homeUsers, getUsers, getUser, createUsers, updateUsers, deleteUsers} from '../controllers/users.controller.js'
const router = Router()

router.get('/', homeUsers)
router.get('/data', getUsers)
router.get('/data/:id', getUser)
router.post('/data', createUsers)
router.patch('/data/:id', updateUsers)
router.delete('/data/:id', deleteUsers)

export default router