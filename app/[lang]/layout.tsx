import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Preloader } from "@/components/layout/preloader";
import { CustomCursor } from "@/components/layout/custom-cursor";
import Navbar from "@/components/layout/navbar";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sanjibsantra.dev";

  const title = isTr
    ? "Sanjib Santra | Full Stack Geliştirici (Next.js, Node.js, React)"
    : "Sanjib Santra | Full Stack Developer (Next.js, Node.js, React)";

  const description = isTr
    ? "Next.js 15, React, Node.js, TypeScript ve MongoDB konularında uzmanlaşmış Full Stack Geliştirici. Canlı kurumsal platformları, headless CMS mimarilerini ve ERP sistemlerini keşfedin."
    : "Full Stack Developer specializing in production Next.js 15, React, Node.js, TypeScript, and MongoDB. Explore live enterprise platforms, headless CMS architectures, and ERP systems.";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Sanjib Santra`,
    },
    description,
    keywords: [
      "Sanjib Santra",
      "Full Stack Developer",
      "Next.js Developer",
      "React.js Developer",
      "Node.js Developer",
      "TypeScript",
      "MERN Stack",
      "MongoDB",
      "Prisma ORM",
      "Express.js",
      "Tailwind CSS",
      "Software Engineer Portfolio",
      "Kolkata Web Developer",
      "Remote Full Stack Developer"
    ],
    authors: [{ name: "Sanjib Santra", url: "https://github.com/sanjib45" }],
    creator: "Sanjib Santra",
    publisher: "Sanjib Santra",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${baseUrl}/en`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/en`,
      siteName: "Sanjib Santra Portfolio",
      images: [
        {
          url: "/resume/sanjib-profile.jpg",
          width: 1200,
          height: 630,
          alt: "Sanjib Santra - Full Stack Developer",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/resume/sanjib-profile.jpg"],
      creator: "@sanjib45",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const [dictionary, contents, shared] = await Promise.all([
    getDictionary(lang),
    getContents(lang),
    getSharedData(),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
        <JsonLd lang={lang} />
        <LanguageProvider lang={lang} dictionary={dictionary} contents={contents} shared={shared}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
            <Preloader />
            <SmoothScroll>
              <Navbar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
