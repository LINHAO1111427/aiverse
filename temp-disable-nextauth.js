const fs = require('fs');
const path = require('path');

const nextAuthPath = path.join(__dirname, 'src', 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
const backupPath = path.join(__dirname, 'src', 'app', 'api', 'auth', '[...nextauth]', 'route.ts.backup');

try {
  // 创建备份
  if (fs.existsSync(nextAuthPath)) {
    fs.copyFileSync(nextAuthPath, backupPath);
    
    // 创建一个空的 generateStaticParams 文件
    const newContent = `// Temporarily disabled for static export
export async function generateStaticParams() {
  return []
}

// NextAuth route temporarily disabled
// export { default } from "next-auth"
`;
    
    fs.writeFileSync(nextAuthPath, newContent);
    console.log('NextAuth route temporarily disabled for static export');
  } else {
    console.log('NextAuth route file not found');
  }
} catch (error) {
  console.error('Error:', error);
}