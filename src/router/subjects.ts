import express from 'express'
import { addSubject, getAllSubjects } from '../controllers/subjects'

export default (router: express.Router) => {
    router.get('/subjects', getAllSubjects)
    router.post('/subjects', addSubject)
}