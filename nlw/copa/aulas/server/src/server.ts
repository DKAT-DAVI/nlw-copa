import Fastify, { fastify } from "fastify"
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'

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

    // Defines the port the server will run on
    await fastify.listen({port: 3333, /*host: '0.0.0.0'*/})
}

bootstrap()