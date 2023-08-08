import express from 'express'

import subjects from './subjects'
const router = express.Router()

export default (): express.Router => {
    subjects(router)
    return router
}