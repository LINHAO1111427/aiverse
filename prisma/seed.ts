import { PrismaClient } from "@prisma/client"
import { mainCategories, mainTools } from "./seed-data"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Delete existing data
  await prisma.rating.deleteMany({})
  await prisma.tool.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.tag.deleteMany({})
  
  console.log("Cleared existing data")

  // Create categories
  const categoryMap = new Map()
  
  for (const categoryData of mainCategories) {
    const category = await prisma.category.create({
      data: categoryData,
    })
    categoryMap.set(categoryData.slug, category.id)
    console.log(`Created category: ${category.name}`)
  }

  console.log(`Created ${mainCategories.length} categories`)

  // Create tools
  for (const toolData of mainTools) {
    const { categorySlug, ...rest } = toolData
    const tool = await prisma.tool.create({
      data: {
        ...rest,
        categoryId: categoryMap.get(categorySlug),
      },
    })
    console.log(`Created tool: ${tool.name}`)
  }

  console.log(`Created ${mainTools.length} tools`)

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: "GPT-4", slug: "gpt-4" } }),
    prisma.tag.create({ data: { name: "Open Source", slug: "open-source" } }),
    prisma.tag.create({ data: { name: "API Available", slug: "api-available" } }),
    prisma.tag.create({ data: { name: "Free Plan", slug: "free-plan" } }),
    prisma.tag.create({ data: { name: "Enterprise", slug: "enterprise" } }),
  ])

  console.log(`Created ${tags.length} tags`)

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })