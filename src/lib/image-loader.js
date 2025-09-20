// 自定义图片加载器，用于静态导出
export default function imageLoader({ src, width, quality }) {
  // 对于静态导出，直接返回原始src
  return src
}