import { PrismaClient } from "@prisma/client"
import { mainCategories, mainTools } from "./seed-data"
import { workflowCategories, sampleWorkflows, workflowSteps, workflowToolCosts } from "./seed-workflow-data"
import { extendedWorkflows, extendedWorkflowSteps, extendedWorkflowToolCosts } from "./seed-workflow-extended"
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Delete existing data
  await prisma.workflowResource.deleteMany({})
  await prisma.workflowUsageLog.deleteMany({})
  await prisma.userSavedWorkflow.deleteMany({})
  await prisma.workflowReview.deleteMany({})
  await prisma.workflowToolCost.deleteMany({})
  await prisma.workflowStep.deleteMany({})
  await prisma.workflow.deleteMany({})
  await prisma.workflowCategory.deleteMany({})
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

  // Create workflow categories
  console.log("\nSeeding workflow categories...")
  const workflowCategoryMap = new Map()
  
  for (const categoryData of workflowCategories) {
    const category = await prisma.workflowCategory.create({
      data: categoryData,
    })
    workflowCategoryMap.set(categoryData.slug, category.id)
    console.log(`Created workflow category: ${category.name}`)
  }

  console.log(`Created ${workflowCategories.length} workflow categories`)

  // Create workflows
  console.log("\nSeeding workflows...")
  const toolMap = new Map()
  const tools = await prisma.tool.findMany()
  tools.forEach(tool => toolMap.set(tool.slug, tool.id))

  for (const workflowData of sampleWorkflows) {
    const { categorySlug, ...rest } = workflowData
    
    const workflow = await prisma.workflow.create({
      data: {
        ...rest,
        categoryId: workflowCategoryMap.get(categorySlug),
        publishedAt: new Date(),
      },
    })
    
    console.log(`Created workflow: ${workflow.name}`)

    // Create workflow steps
    const steps = workflowSteps[workflow.slug]
    if (steps) {
      for (const stepData of steps) {
        const { 
          primaryToolName, 
          primaryToolSlug,
          primaryToolLogoUrl,
          alternativeToolNames, 
          ...stepRest 
        } = stepData
        
        await prisma.workflowStep.create({
          data: {
            ...stepRest,
            workflowId: workflow.id,
            primaryToolId: toolMap.get(primaryToolName.toLowerCase().replace(/\s+/g, '-')),
            primaryToolName,
            primaryToolSlug,
            primaryToolLogoUrl,
            alternativeToolIds: alternativeToolNames?.map(name => 
              toolMap.get(name.toLowerCase().replace(/\s+/g, '-'))
            ).filter(Boolean) || [],
            alternativeToolNames: alternativeToolNames || [],
          },
        })
      }
      console.log(`  - Created ${steps.length} steps for ${workflow.name}`)
    }

    // Create tool costs
    const costs = workflowToolCosts[workflow.slug]
    if (costs) {
      for (const costData of costs) {
        const { 
          toolName,
          toolSlug,
          toolLogoUrl,
          ...costRest 
        } = costData
        const toolId = toolMap.get(toolName.toLowerCase().replace(/\s+/g, '-'))
        
        if (toolId) {
          await prisma.workflowToolCost.create({
            data: {
              ...costRest,
              workflowId: workflow.id,
              toolId,
              toolName,
              toolSlug,
              toolLogoUrl,
            },
          })
        }
      }
      console.log(`  - Created ${costs.length} tool costs for ${workflow.name}`)
    }
  }

  console.log(`Created ${sampleWorkflows.length} workflows`)

  // Create extended workflows
  console.log("\nSeeding extended workflows...")
  const allWorkflows = [...sampleWorkflows, ...extendedWorkflows]
  const allWorkflowSteps = { ...workflowSteps, ...extendedWorkflowSteps }
  const allWorkflowToolCosts = { ...workflowToolCosts, ...extendedWorkflowToolCosts }

  for (const workflowData of extendedWorkflows) {
    const { categorySlug, ...rest } = workflowData
    
    const workflow = await prisma.workflow.create({
      data: {
        ...rest,
        categoryId: workflowCategoryMap.get(categorySlug),
        publishedAt: new Date(),
      },
    })
    
    console.log(`Created workflow: ${workflow.name}`)

    // Create workflow steps
    const steps = allWorkflowSteps[workflow.slug]
    if (steps) {
      for (const stepData of steps) {
        const { 
          primaryToolName, 
          primaryToolSlug,
          primaryToolLogoUrl,
          alternativeToolNames, 
          ...stepRest 
        } = stepData
        
        await prisma.workflowStep.create({
          data: {
            ...stepRest,
            workflowId: workflow.id,
            primaryToolId: toolMap.get(primaryToolName.toLowerCase().replace(/\s+/g, '-')),
            primaryToolName,
            primaryToolSlug,
            primaryToolLogoUrl,
            alternativeToolIds: alternativeToolNames?.map(name => 
              toolMap.get(name.toLowerCase().replace(/\s+/g, '-'))
            ).filter(Boolean) || [],
            alternativeToolNames: alternativeToolNames || [],
          },
        })
      }
      console.log(`  - Created ${steps.length} steps for ${workflow.name}`)
    }

    // Create tool costs
    const costs = allWorkflowToolCosts[workflow.slug]
    if (costs) {
      for (const costData of costs) {
        const { 
          toolName,
          toolSlug,
          toolLogoUrl,
          ...costRest 
        } = costData
        const toolId = toolMap.get(toolName.toLowerCase().replace(/\s+/g, '-'))
        
        if (toolId) {
          await prisma.workflowToolCost.create({
            data: {
              ...costRest,
              workflowId: workflow.id,
              toolId,
              toolName,
              toolSlug,
              toolLogoUrl,
            },
          })
        }
      }
      console.log(`  - Created ${costs.length} tool costs for ${workflow.name}`)
    }
  }

  console.log(`Created ${extendedWorkflows.length} extended workflows`)
  console.log(`Total workflows created: ${allWorkflows.length}`)

  console.log("\nSeeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })