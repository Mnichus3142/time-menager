import { error, json, cookies } from '@sveltejs/kit'
import { Client } from 'pg'

export const POST = async ({ request, cookies }) => {
    try {
        const { user, hashed } = await request.json()

        const client = new Client({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'timemenager',
            password: 'zaq1@WSX',
            port: 5432
        })

        await client.connect()

        const res = await client.query(`SELECT * FROM users WHERE username = '${user}'`)

        console.log(res.rowCount)

        if (res.rows[0]["password"] == hashed)
        {
            cookies.set('sessionId', user, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })

            return json({ message: 'All good' }, { status: 200 })
        }

        else 
        {
            return json({ message: 'Wrong password' }, { status: 204 })
        }
    } 

    catch (error) {
        return json({ message: 'Error processing request' }, { status: 203 })
    }
}