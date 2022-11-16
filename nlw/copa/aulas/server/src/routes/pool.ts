import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function poolRoutes(fastify: FastifyInstance) { 
    // http://localhost:3333/pools/count
    fastify.get('/pools/count', async() => {
        
        // consuming database
            const count = await prisma.pool.count()
    
            return { count }
        })

// Creating new Pool    

    fastify.post('/pools', async(request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body)

        // Creating a unique code to id
        const generate = new ShortUniqueId({length: 6})

        const code = String(generate()).toUpperCase();

        await prisma.pool.create({
            data: {
                title,
                code: code
            }
        })

        return reply.status(201).send({code})
        //return { title }
    })
}