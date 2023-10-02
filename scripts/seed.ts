const  { PrismaClient }= require("@prisma/client")


const db= new PrismaClient()


async function main() {


  try {
    await db.category.createMany({
      data: [
        {name:"Famaous People"},
        {name:"Games"},
        {name:"Animals"},
      ]
    })
  } catch(error) {
    console.error('error seeding defaullt categories',error)
  } finally {
    await db.$disconnect()
  }
}

main()