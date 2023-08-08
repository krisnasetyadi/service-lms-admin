import express from 'express'
import { insert } from '../constant/constant'
import { query } from '../db/db'

export const addSubject = async (req: express.Request, res: express.Response) => {
    try {
        // subject post
        const { name, title, sub_title, content } = req.body
        const values = [name, title, sub_title, content]

        const queryString: string = `${insert} subjects (name, title, sub_title, content)
        VALUES (${values.map((_, idx) => `$${idx + 1}`)})`
        await query(queryString, values)
        res.status(201).json({ message: 'Subject added successfully' });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'An error occured'})
    }
}

export const getAllSubjects = async (req: express.Request, res: express.Response) => {
    try {
        const countQuery = 'SELECT COUNT(*) FROM subjects';
        const { rows: [{ count }] } = await query(countQuery);
   
        const page = {
            limit: Number(req.query.limit) || 10,
            offset: Number(req.query.offset) || 0,
            total: Number(count)
        }
        const queryString: string = `SELECT * FROM subjects LIMIT ${page.limit} OFFSET ${page.offset}`
        const subjects = await query(queryString)
  
        const data = {
            pagination: {
               ...page
            },
            data: subjects?.rows
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
    }
}