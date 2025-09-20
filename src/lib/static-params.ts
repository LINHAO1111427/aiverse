// 通用的静态参数生成函数，用于支持静态生成
export function generateLocaleStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ]
}

// 为需要静态生成的页面提供通用的导出
export { generateLocaleStaticParams as generateStaticParams }