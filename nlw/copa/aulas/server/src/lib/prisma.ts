import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    // log of executed queries
    log: ['query'],
})