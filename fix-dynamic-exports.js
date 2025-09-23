const fs = require('fs');
const path = require('path');

const files = [
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

const dynamicExport = '\n// 禁用静态生成，使用服务器端渲染\nexport const dynamic = \'force-dynamic\'\n';

files.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 检查是否已经有 dynamic export
      if (!content.includes('export const dynamic')) {
        // 在第一个 import 之后添加 dynamic export
        const lines = content.split('\n');
        let insertIndex = 0;
        
        // 找到最后一个 import 语句的位置
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) {
            insertIndex = i + 1;
          } else if (lines[i].trim() === '' && insertIndex > 0) {
            break;
          }
        }
        
        // 插入 dynamic export
        lines.splice(insertIndex, 0, dynamicExport);
        const newContent = lines.join('\n');
        
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`✅ 已修复: ${filePath}`);
      } else {
        console.log(`⏭️  已存在: ${filePath}`);
      }
    } else {
      console.log(`❌ 文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 错误处理 ${filePath}:`, error.message);
  }
});

console.log('\n🎉 批量修复完成！');