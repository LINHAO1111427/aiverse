const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[locale]/categories/page.tsx',
  'src/app/[locale]/about/page.tsx',
  'src/app/[locale]/blog/page.tsx',
  'src/app/[locale]/blog/[slug]/page.tsx',
  'src/app/[locale]/community/page.tsx',
  'src/app/[locale]/compare/page.tsx',
  'src/app/[locale]/contact/page.tsx',
  'src/app/[locale]/cookies/page.tsx',
  'src/app/[locale]/dmca/page.tsx',
  'src/app/[locale]/docs/page.tsx',
  'src/app/[locale]/help/page.tsx',
  'src/app/[locale]/press/page.tsx',
  'src/app/[locale]/privacy/page.tsx',
  'src/app/[locale]/terms/page.tsx',
  'src/app/[locale]/tools/[slug]/page.tsx',
  'src/app/[locale]/workflows/page.tsx'
];

files.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 移除 dynamic export 及其相关注释
      content = content.replace(/\/\/ 禁用静态生成.*?\n/g, '');
      content = content.replace(/export const dynamic = ['"']force-dynamic['"']\s*\n+/g, '');
      
      // 清理多余的空行
      content = content.replace(/\n{3,}/g, '\n\n');
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ 已移除 force-dynamic: ${filePath}`);
    } else {
      console.log(`❌ 文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 错误处理 ${filePath}:`, error.message);
  }
});

console.log('\n🎉 清理完成！');