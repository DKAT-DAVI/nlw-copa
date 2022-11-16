import Fastify, { fastify } from "fastify"
import cors from '@fastify/cors'

import { poolRoutes } from "./routes/pool"
import { userRoutes } from "./routes/user"
import { guessRoutes } from "./routes/guess"
import { authRoutes } from "./routes/auth"
import { gameRoutes } from "./routes/game"


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

    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)

    // Defines the port the server will run on
    await fastify.listen({port: 3333, /*host: '0.0.0.0'*/})
}

bootstrap()