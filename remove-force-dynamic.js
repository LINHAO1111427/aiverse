const fs = require('fs');
const path = require('path');

// 需要修改的文件列表
const files = [
  'src/app/api/tools/[slug]/ratings/route.ts',
  'src/app/api/v1/workflows/[slug]/route.ts',
  'src/app/api/v1/tools/[id]/route.ts',
  'src/app/api/v1/categories/route.ts',
  'src/app/api/tools/route.ts',
  'src/app/api/tools/search/route.ts',
  'src/app/api/v1/workflows/route.ts',
  'src/app/api/v1/workflow-categories/route.ts',
  'src/app/api/v1/tools/route.ts',
  'src/app/api/v1/submit/route.ts',
  'src/app/api/v1/search/route.ts',
  'src/app/api/v1/ratings/route.ts'
];

let processedCount = 0;

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 删除 force-dynamic 声明
      const originalContent = content;
      content = content.replace(/export const dynamic = ['"]force-dynamic['"];?\n?/g, '');
      content = content.replace(/export const dynamic = ['"]force-dynamic['"];?\r?\n?/g, '');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Removed force-dynamic from: ${filePath}`);
        processedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log(`\nProcessed ${processedCount} files`);