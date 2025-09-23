const fs = require('fs');
const path = require('path');

const remainingPages = {
  'src/app/[locale]/cookies/page.tsx': {
    title: { en: 'Cookie Policy - AIverse', zh: 'Cookie 政策 - AIverse' },
    heading: { en: 'Cookie Policy', zh: 'Cookie 政策' },
    content: { en: 'We use cookies to improve your browsing experience.', zh: '我们使用 Cookie 来改善您的浏览体验。' }
  },
  'src/app/[locale]/dmca/page.tsx': {
    title: { en: 'DMCA Policy - AIverse', zh: 'DMCA 政策 - AIverse' },
    heading: { en: 'DMCA Policy', zh: 'DMCA 政策' },
    content: { en: 'Our Digital Millennium Copyright Act policy.', zh: '我们的数字千年版权法政策。' }
  },
  'src/app/[locale]/press/page.tsx': {
    title: { en: 'Press & Media - AIverse', zh: '媒体中心 - AIverse' },
    heading: { en: 'Press & Media', zh: '媒体中心' },
    content: { en: 'Press releases and media resources.', zh: '新闻发布和媒体资源。' }
  }
};

function generatePage(config) {
  return `import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '${config.title.zh}' : '${config.title.en}',
    description: isZh ? '${config.content.zh}' : '${config.content.en}',
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

Object.entries(remainingPages).forEach(([filePath, config]) => {
  try {
    const fullPath = path.join(__dirname, filePath);
    const newContent = generatePage(config);
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`✅ 已修复: ${filePath}`);
  } catch (error) {
    console.error(`❌ 错误处理 ${filePath}:`, error.message);
  }
});

console.log('\n🎉 最终修复完成！');