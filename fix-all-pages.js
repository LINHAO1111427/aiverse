const fs = require('fs');
const path = require('path');

// 所有需要修复的页面
const pageConfigs = {
  'src/app/[locale]/about/page.tsx': {
    title: { en: 'About Us - AIverse', zh: '关于我们 - AIverse' },
    description: { en: 'Learn about AIverse mission to help you discover the best AI tools.', zh: '了解 AIverse 的使命，帮助您发现最好的 AI 工具。' },
    heading: { en: 'About AIverse', zh: '关于 AIverse' },
    content: { en: 'We are dedicated to helping you discover the best AI tools for your needs.', zh: '我们致力于帮助您发现最适合您需求的 AI 工具。' }
  },
  'src/app/[locale]/blog/page.tsx': {
    title: { en: 'Blog - AIverse', zh: '博客 - AIverse' },
    description: { en: 'Latest news and insights about AI tools and technology.', zh: '关于 AI 工具和技术的最新资讯和见解。' },
    heading: { en: 'AI Tools Blog', zh: 'AI 工具博客' },
    content: { en: 'Stay updated with the latest in AI technology.', zh: '了解 AI 技术的最新动态。' }
  },
  'src/app/[locale]/community/page.tsx': {
    title: { en: 'Community - AIverse', zh: '社区 - AIverse' },
    description: { en: 'Join our community of AI enthusiasts and professionals.', zh: '加入我们的 AI 爱好者和专业人士社区。' },
    heading: { en: 'AI Community', zh: 'AI 社区' },
    content: { en: 'Connect with fellow AI enthusiasts.', zh: '与 AI 爱好者建立联系。' }
  },
  'src/app/[locale]/compare/page.tsx': {
    title: { en: 'Compare AI Tools - AIverse', zh: '比较 AI 工具 - AIverse' },
    description: { en: 'Compare different AI tools to find the best solution.', zh: '比较不同的 AI 工具，找到最佳解决方案。' },
    heading: { en: 'Compare AI Tools', zh: '比较 AI 工具' },
    content: { en: 'Find the best AI tool for your specific needs.', zh: '找到最适合您特定需求的 AI 工具。' }
  },
  'src/app/[locale]/docs/page.tsx': {
    title: { en: 'Documentation - AIverse', zh: '文档 - AIverse' },
    description: { en: 'Learn how to use AIverse and discover AI tools.', zh: '了解如何使用 AIverse 并发现 AI 工具。' },
    heading: { en: 'Documentation', zh: '文档' },
    content: { en: 'Everything you need to know about using AIverse.', zh: '您需要了解的关于使用 AIverse 的一切。' }
  },
  'src/app/[locale]/help/page.tsx': {
    title: { en: 'Help & Support - AIverse', zh: '帮助与支持 - AIverse' },
    description: { en: 'Get help and support for using AIverse.', zh: '获得使用 AIverse 的帮助和支持。' },
    heading: { en: 'Help & Support', zh: '帮助与支持' },
    content: { en: 'Find answers to frequently asked questions.', zh: '找到常见问题的答案。' }
  },
  'src/app/[locale]/privacy/page.tsx': {
    title: { en: 'Privacy Policy - AIverse', zh: '隐私政策 - AIverse' },
    description: { en: 'Our privacy policy and data protection practices.', zh: '我们的隐私政策和数据保护实践。' },
    heading: { en: 'Privacy Policy', zh: '隐私政策' },
    content: { en: 'We respect your privacy and protect your data.', zh: '我们尊重您的隐私并保护您的数据。' }
  },
  'src/app/[locale]/terms/page.tsx': {
    title: { en: 'Terms of Service - AIverse', zh: '服务条款 - AIverse' },
    description: { en: 'Terms and conditions for using AIverse.', zh: '使用 AIverse 的条款和条件。' },
    heading: { en: 'Terms of Service', zh: '服务条款' },
    content: { en: 'Please read our terms and conditions.', zh: '请阅读我们的条款和条件。' }
  }
};

// 生成简化的页面模板
function generateSimplePage(config) {
  return `import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '${config.title.zh}' : '${config.title.en}',
    description: isZh ? '${config.description.zh}' : '${config.description.en}',
  }
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? '${config.heading.zh}' : '${config.heading.en}'}
            </h1>
            <p className="text-xl text-gray-600">
              {isZh ? '${config.content.zh}' : '${config.content.en}'}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600 leading-relaxed">
                {isZh 
                  ? '此页面正在开发中，敬请期待更多功能。' 
                  : 'This page is under development. More features coming soon.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}`;
}

// 批量处理页面
Object.entries(pageConfigs).forEach(([filePath, config]) => {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      const newContent = generateSimplePage(config);
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`✅ 已修复: ${filePath}`);
    } else {
      console.log(`❌ 文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 错误处理 ${filePath}:`, error.message);
  }
});

console.log('\n🎉 批量修复完成！');