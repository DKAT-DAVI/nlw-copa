import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function guessRoutes(fastify: FastifyInstance) { 
    // Count guesses
    fastify.get('/guesses/count', async() => {
            
        // consuming database
            const count = await prisma.guess.count()

            return { count }
        })
}
 
