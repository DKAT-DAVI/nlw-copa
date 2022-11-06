import Fastify, { fastify } from "fastify"
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    // log of executed queries
    log: ['query'],
})

// Boot function
async function bootstrap() {
    const fastify = Fastify({
        
        // Drop information logs
        logger: true,
    })

    await fastify.register(cors, {
        // Allows all apllications to acess the back-end
        origin: true,
    })

    // First rote to back-end

    // http://localhost:3333/pools/count
    fastify.get('/pools/count', async() => {
        
    // consuming database
        const count = await prisma.pool.count()

        return { count }
    })

    // Count users
    fastify.get('/users/count', async() => {
        
        // consuming database
            const count = await prisma.user.count()
    
            return { count }
        })

    // Count guesses
    fastify.get('/guesses/count', async() => {
        
        // consuming database
            const count = await prisma.guess.count()
    
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

    // Defines the port the server will run on
    await fastify.listen({port: 3333, /*host: '0.0.0.0'*/})
}

bootstrap()