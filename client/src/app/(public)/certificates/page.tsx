import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates — LearnHub",
  description: "View and verify your earned certificates and credentials on LearnHub.",
};

const CERTIFICATES = [
  {
    id: "CERT-UX-2024-01",
    title: "User Experience Design Professional Certificate",
    issuer: "LearnHub Design Academy",
    instructor: "Eichiro D. Lucky",
    date: "November 2024",
    grade: "98% (High Distinction)",
    skills: ["User Research", "Wireframing", "Usability Testing", "Figma"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-FS-2024-02",
    title: "Full-Stack Web Development with Next.js & Express",
    issuer: "LearnHub Engineering School",
    instructor: "Alex Rivera",
    date: "October 2024",
    grade: "95% (Distinction)",
    skills: ["Next.js 16", "React 19", "Express.js", "Prisma", "PostgreSQL"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-PG-2024-03",
    title: "PostgreSQL Database Performance & Indexing",
    issuer: "LearnHub Data Institute",
    instructor: "David Chen",
    date: "September 2024",
    grade: "92% (Distinction)",
    skills: ["Query Tuning", "EXPLAIN ANALYZE", "B-Tree Indexes", "Neon Serverless"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-FG-2024-04",
    title: "Advanced Figma Component Systems & Auto Layout",
    issuer: "LearnHub Design Academy",
    instructor: "Sarah Jenkins",
    date: "August 2024",
    grade: "96% (Distinction)",
    skills: ["Design Tokens", "Auto Layout 5.0", "Interactive Variants", "Design Systems"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-TW-2024-05",
    title: "Modern Tailwind CSS: Responsive SaaS Architecture",
    issuer: "LearnHub Frontend Lab",
    instructor: "Elena Rostova",
    date: "July 2024",
    grade: "94% (Distinction)",
    skills: ["Tailwind v4", "AMOLED Dark Mode", "CSS Variables", "Accessible UI"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-DK-2024-06",
    title: "Containerization & Docker DevOps Essentials",
    issuer: "LearnHub Cloud Academy",
    instructor: "Marcus Vance",
    date: "June 2024",
    grade: "91% (Pass)",
    skills: ["Docker", "Docker Compose", "Multi-stage Builds", "CI/CD"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-RC-2024-07",
    title: "React 19 Concurrent Primitives & Server Actions",
    issuer: "LearnHub Engineering School",
    instructor: "Maya Lin",
    date: "May 2024",
    grade: "97% (High Distinction)",
    skills: ["React Server Components", "useActionState", "Optimistic UI"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-API-2024-08",
    title: "RESTful API Engineering & Clean MVC Pattern",
    issuer: "LearnHub Engineering School",
    instructor: "Jason Cooper",
    date: "April 2024",
    grade: "93% (Distinction)",
    skills: ["Express.js", "Zod Validation", "JWT Security", "Rate Limiting"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-PY-2024-09",
    title: "Python Data Structures & Computational Thinking",
    issuer: "LearnHub Data Institute",
    instructor: "Dr. Angela Barnes",
    date: "March 2024",
    grade: "90% (Pass)",
    skills: ["Python 3", "OOP", "NumPy", "Pandas", "Automation"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-SEC-2024-10",
    title: "Web Security & OWASP Defense Engineering",
    issuer: "LearnHub Security Operations",
    instructor: "Samir K. Patel",
    date: "February 2024",
    grade: "96% (Distinction)",
    skills: ["SQLi Prevention", "XSS Mitigation", "CSP Headers", "httpOnly Cookies"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-MOT-2024-11",
    title: "UI Motion Design & Micro-Interactions",
    issuer: "LearnHub Design Academy",
    instructor: "Chloe Dupont",
    date: "January 2024",
    grade: "95% (Distinction)",
    skills: ["CSS Animations", "Framer Motion", "Timing Curves", "A11y Motion"],
    credentialUrl: "#",
    verified: true,
  },
  {
    id: "CERT-GIT-2024-12",
    title: "Git Version Control & Open Source Contribution",
    issuer: "LearnHub Engineering School",
    instructor: "Nathan Cole",
    date: "December 2023",
    grade: "99% (High Distinction)",
    skills: ["Interactive Rebase", "Git Flow", "GitHub Actions", "Merge Conflicts"],
    credentialUrl: "#",
    verified: true,
  },
];

export default function CertificatesPage() {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            My Certificates
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
            Verified credentials issued upon completing courses and final assessments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {CERTIFICATES.length} Verified Credentials
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATES.map((cert) => (
          <article
            key={cert.id}
            className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <span className="text-[11px] font-mono text-gray-400 dark:text-neutral-500">
                {cert.id}
              </span>
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-1.5">
              {cert.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-neutral-400 mb-3">
              {cert.issuer} · by {cert.instructor}
            </p>

            <div className="space-y-1.5 text-xs text-gray-600 dark:text-neutral-300 border-t border-gray-50 dark:border-neutral-900 pt-3 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-neutral-500">Issued</span>
                <span>{cert.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-neutral-500">Grade</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{cert.grade}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-2">
              <Link
                href={cert.credentialUrl}
                className="w-full text-center text-xs font-medium py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors flex items-center justify-center gap-1.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M12 15l-4-4 1.4-1.4 1.6 1.6V3h2v8.2l1.6-1.6L16 11l-4 4z" />
                  <path d="M20 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                </svg>
                Download PDF Certificate
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
