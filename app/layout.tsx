import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: { default: "赵裴裴 · AI 训练师方向", template: "%s · 赵裴裴" },
    description: "在理性与艺术之间，训练更好的 AI 体验。赵裴裴的视觉传达、内容运营与 AI 协作实践。",
    keywords: ["赵裴裴", "AI 训练师", "视觉传达设计", "AI 协作", "内容运营"],
    authors: [{ name: "赵裴裴" }],
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: "赵裴裴 · 在理性与艺术之间",
      description: "训练更好的 AI 体验。",
      locale: "zh_CN",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1731, height: 909, alt: "赵裴裴 · 在理性与艺术之间" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "赵裴裴 · AI 训练师方向",
      description: "在理性与艺术之间，训练更好的 AI 体验。",
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020713",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
