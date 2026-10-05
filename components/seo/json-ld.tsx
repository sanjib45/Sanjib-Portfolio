export function JsonLd({ lang }: { lang: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanjibsantra.dev';
  const isTr = lang === 'tr';

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sanjib Santra",
    url: `${baseUrl}/${lang}`,
    image: `${baseUrl}/resume/sanjib-profile.jpg`,
    jobTitle: isTr ? "Full Stack Geliştirici" : "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "HOVSOL Technologies",
    },
    sameAs: [
      "https://github.com/sanjib45",
      "https://www.linkedin.com/in/sanjib-santra/",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Future Institute of Engineering and Management",
      },
      {
        "@type": "EducationalOrganization",
        name: "Prabhat Kumar College",
      },
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma ORM",
      "Socket.IO",
      "RESTful APIs",
      "Tailwind CSS",
      "GSAP",
      "Headless CMS",
      "Full Stack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "India",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: isTr ? "Sanjib Santra | Full Stack Geliştirici Portfolyosu" : "Sanjib Santra | Full Stack Developer Portfolio",
    url: `${baseUrl}/${lang}`,
    inLanguage: isTr ? "tr-TR" : "en-US",
    description: isTr
      ? "Üretim odaklı Next.js 15, React, Node.js, TypeScript ve MongoDB konularında uzmanlaşmış Full Stack Geliştirici."
      : "Full Stack Developer specializing in production Next.js 15, React, Node.js, TypeScript, and MongoDB.",
    author: {
      "@type": "Person",
      name: "Sanjib Santra",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
