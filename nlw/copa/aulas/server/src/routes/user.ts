import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function userRoutes(fastify: FastifyInstance) { 
    // Count users
    fastify.get('/users/count', async() => {
    
        // consuming database
            const count = await prisma.user.count()
    
            return { count }
        })
}