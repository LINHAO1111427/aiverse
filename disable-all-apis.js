const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src', 'app', 'api');
const apiDisabledDir = path.join(__dirname, 'src', 'app', 'api-disabled');

try {
  if (fs.existsSync(apiDir)) {
    console.log('Disabling all API routes for static export...');
    
    // 如果目标目录已存在，先删除
    if (fs.existsSync(apiDisabledDir)) {
      fs.rmSync(apiDisabledDir, { recursive: true, force: true });
    }
    
    // 重命名API目录
    fs.renameSync(apiDir, apiDisabledDir);
    console.log('API directory disabled successfully');
    
    // 创建一个空的api目录，避免导入错误
    fs.mkdirSync(apiDir);
    
    // 创建一个基本的路由文件
    const basicRouteContent = `// All API routes have been disabled for static export
// Original routes are available in api-disabled directory

export function GET() {
  return new Response('API routes are disabled in static export mode', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  })
}`;
    
    fs.writeFileSync(path.join(apiDir, 'route.ts'), basicRouteContent);
    console.log('Created basic API route replacement');
    
  } else {
    console.log('API directory not found');
  }
} catch (error) {
  console.error('Error disabling APIs:', error);
}