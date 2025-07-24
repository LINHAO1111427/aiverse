require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

console.log('Initializing database...');

try {
  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Push schema to database
  console.log('\nPushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('\n✅ Database initialized successfully!');
} catch (error) {
  console.error('❌ Error initializing database:', error.message);
  process.exit(1);
}