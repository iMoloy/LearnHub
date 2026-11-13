import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ApiResponse, Certificate } from "@/types";

export const metadata: Metadata = {
  title: "Certificates — LearnHub",
  description: "View and verify your earned certificates and credentials on LearnHub.",
};

const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    certCode: "CERT-UX-2024-01",
    title: "User Experience Design Professional Certificate",
    issuer: "LearnHub Design Academy",
    instructor: "Eichiro D. Lucky",
    issueDate: "November 2024",
    grade: "98% (High Distinction)",
    skills: ["User Research", "Wireframing", "Usability Testing", "Figma"],
    credentialUrl: "#",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    certCode: "CERT-FS-2024-02",
    title: "Full-Stack Web Development with Next.js & Express",
    issuer: "LearnHub Engineering School",
    instructor: "Alex Rivera",
    issueDate: "October 2024",
    grade: "95% (Distinction)",
    skills: ["Next.js 16", "React 19", "Express.js", "Prisma", "PostgreSQL"],
    credentialUrl: "#",
    verified: true,
    createdAt: new Date().toISOString(),
  },
];

async function getCertificatesData(): Promise<Certificate[]> {
  try {
    const res = await api.get<ApiResponse<Certificate[]>>("/api/certificates", {
      revalidate: 60,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch certificates from database API:", err);
    return FALLBACK_CERTIFICATES;
  }
}

export default async function CertificatesPage() {
  const certificates = await getCertificatesData();

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
            {certificates.length} Verified Credentials
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
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
                {cert.certCode}
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
                <span>{cert.issueDate}</span>
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
                href={cert.credentialUrl || "#"}
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
