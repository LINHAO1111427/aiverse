const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

async function setupMonitoringDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:liin745839@@db.sazjomdhzodvelpfwcwy.supabase.co:5432/postgres?sslmode=require"
  })

  try {
    console.log('Connecting to database...')
    await client.connect()
    
    console.log('Running initialization script...')
    const sql = fs.readFileSync(
      path.join(__dirname, 'init-tool-monitoring-db.sql'), 
      'utf8'
    )
    
    await client.query(sql)
    
    console.log('✅ Database setup completed successfully!')
    
    // 验证表创建
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE 'tool_%' OR table_name LIKE 'discovered_%' OR table_name = 'monitoring_logs')
      ORDER BY table_name;
    `)
    
    console.log('\nCreated tables:')
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

// 运行设置
setupMonitoringDatabase()