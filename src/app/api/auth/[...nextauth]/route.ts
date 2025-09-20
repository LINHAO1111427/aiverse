import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// 为静态导出生成参数
export async function generateStaticParams() {
  return []
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }