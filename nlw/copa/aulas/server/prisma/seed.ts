import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Davi Kalel',
            email: 'dkatdavi@gmail.com',
            avatarUrl: 'https://github.com/dkat-davi.png',
            }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Poll',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-25T12:00:00.336Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })
    
    await prisma.game.create({
        data: {
            date: '2022-11-30T12:00:00.336Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoint: 2,
                    secondTeamPoint: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }

        
        }
    })
}

main()