import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@learnhub.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@learnhub.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Clear existing lectures and courses to reseed full rich dataset
  await prisma.lecture.deleteMany();
  await prisma.course.deleteMany();

  const coursesData = [
    {
      title: "Become a UX Designer in 2024 (Beginner to Pro)",
      description: "Delve into the art and science of creating intuitive, user-centered designs that not only engage but also enhance the overall digital experience.",
      price: 89.0,
      discountPercent: 20,
      instructorName: "Eichiro D. Lucky",
      duration: "8hr 30min",
      thumbnailUrl: "https://i.ytimg.com/vi/c9Wg6Cb_YlU/hqdefault.jpg",
      lectures: [
        { title: "Introduction to UX Design Principles", description: "Core concepts of usability, user psychology, and design thinking.", videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", position: 0 },
        { title: "User Research & Persona Mapping", description: "How to conduct user interviews, gather data, and create actionable user personas.", videoUrl: "https://www.youtube.com/watch?v=Ovj4hFxko7c", position: 1 },
        { title: "Information Architecture & User Flows", description: "Structuring content navigation and creating seamless end-to-end journey maps.", videoUrl: "https://www.youtube.com/watch?v=qpH7-KFWZRI", position: 2 },
        { title: "Low-Fidelity Wireframing & Prototyping", description: "Translating research insights into rapid clickable wireframes.", videoUrl: "https://www.youtube.com/watch?v=BrVnBdW6_rE", position: 3 },
      ],
    },
    {
      title: "Mastering Figma: From Concept to Production",
      description: "Learn auto-layout, design tokens, component variants, responsive grids, and design system architecture like a senior product designer.",
      price: 65.0,
      discountPercent: 25,
      instructorName: "Sarah Jenkins",
      duration: "10hr 15min",
      thumbnailUrl: "https://i.ytimg.com/vi/FTFaQWZBqQ8/hqdefault.jpg",
      lectures: [
        { title: "Figma Fundamentals & Canvas Navigation", description: "Layers, frames, vector networks, and essential shortcuts.", videoUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", position: 0 },
        { title: "Mastering Auto Layout 5.0", description: "Fluid responsive containers, min/max constraints, and wrapping.", videoUrl: "https://www.youtube.com/watch?v=wIuVvCuiJhU", position: 1 },
        { title: "Component Variants & Interactive States", description: "Building reusable UI components with hover, pressed, and disabled states.", videoUrl: "https://www.youtube.com/watch?v=pfaSUYaSgRo", position: 2 },
        { title: "Design Systems & Token Architecture", description: "Publishing shared libraries, semantic color systems, and typography tokens.", videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", position: 3 },
      ],
    },
    {
      title: "Full-Stack Web Development with Next.js 16 & TypeScript",
      description: "Build high-performance web applications using App Router, React Server Components, Server Actions, and Tailwind CSS.",
      price: 99.0,
      discountPercent: 15,
      instructorName: "Alex Rivera",
      duration: "14hr 45min",
      thumbnailUrl: "https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg",
      lectures: [
        { title: "Next.js App Router Architecture", description: "Understanding the RSC mental model, layouts, and routing conventions.", videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk", position: 0 },
        { title: "Data Fetching & Cache Management", description: "Server-side fetch caching, revalidation tags, and dynamic rendering.", videoUrl: "https://www.youtube.com/watch?v=dDpZfOQBMaU", position: 1 },
        { title: "Server Actions & Form Mutations", description: "Mutating data safely with progressive enhancement and Zod validation.", videoUrl: "https://www.youtube.com/watch?v=SccSCuHhOw0", position: 2 },
      ],
    },
    {
      title: "PostgreSQL & Database Performance Tuning",
      description: "Master relational schema modeling, indexing strategies, connection pooling, and query execution plan analysis.",
      price: 0.0,
      discountPercent: null,
      instructorName: "David Chen",
      duration: "5hr 20min",
      thumbnailUrl: "https://i.ytimg.com/vi/qw--VYLpxG4/hqdefault.jpg",
      lectures: [
        { title: "Relational Schema Design & Constraints", description: "Foreign keys, cascading updates/deletes, and normalization rules.", videoUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4", position: 0 },
        { title: "Targeted Indexing Strategies (B-Tree, GIN, GiST)", description: "How indexes work under the hood and avoiding index bloat.", videoUrl: "https://www.youtube.com/watch?v=-qNSXK7s7_w", position: 1 },
        { title: "EXPLAIN ANALYZE & Query Optimization", description: "Reading query plans, eliminating seq scans, and tuning joins.", videoUrl: "https://www.youtube.com/watch?v=P5N6W6f8hJg", position: 2 },
      ],
    },
    {
      title: "Modern Tailwind CSS: Crafting Beautiful SaaS Interfaces",
      description: "Learn modern utility-first CSS, dark mode design systems, micro-interactions, responsive navigation, and mobile-first layout patterns.",
      price: 45.0,
      discountPercent: 10,
      instructorName: "Elena Rostova",
      duration: "6hr 10min",
      thumbnailUrl: "https://i.ytimg.com/vi/lCxcTsOHrjo/hqdefault.jpg",
      lectures: [
        { title: "Tailwind CSS Layout Basics & Flexbox/Grid", description: "Building complex dashboard grids and flexible columns.", videoUrl: "https://www.youtube.com/watch?v=lCxcTsOHrjo", position: 0 },
        { title: "Dark Mode with CSS Variables & Tokens", description: "Implementing instant theme switches and AMOLED contrast.", videoUrl: "https://www.youtube.com/watch?v=21HuwjmuS7A", position: 1 },
        { title: "Polished UI Components & Micro-interactions", description: "Adding smooth transitions, hover states, and focus rings.", videoUrl: "https://www.youtube.com/watch?v=mr15Xzb1Ook", position: 2 },
      ],
    },
    {
      title: "Docker & Containerization for Modern Web Developers",
      description: "Package, distribute, and orchestrate containerized applications from local development setups to production Kubernetes clusters.",
      price: 59.0,
      discountPercent: 20,
      instructorName: "Marcus Vance",
      duration: "7hr 40min",
      thumbnailUrl: "https://i.ytimg.com/vi/fqMOX6JJhGo/hqdefault.jpg",
      lectures: [
        { title: "Docker Architecture & Core Concepts", description: "Images, containers, daemon, and client communication.", videoUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", position: 0 },
        { title: "Writing Production Multi-Stage Dockerfiles", description: "Minimizing image sizes and optimizing cache layers.", videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE", position: 1 },
        { title: "Docker Compose for Local Full-Stack Environments", description: "Orchestrating Web, API, and Postgres multi-container stacks.", videoUrl: "https://www.youtube.com/watch?v=HG6yIjZapSA", position: 2 },
      ],
    },
    {
      title: "React 19 Deep Dive: Hooks, Actions & Concurrent Mode",
      description: "Explore the newest capabilities of React including useActionState, useOptimistic, server components, and asset preloading.",
      price: 75.0,
      discountPercent: 30,
      instructorName: "Maya Lin",
      duration: "9hr 15min",
      thumbnailUrl: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
      lectures: [
        { title: "What's New in React 19 Overview", description: "Summary of new primitives, compiler updates, and hooks.", videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8", position: 0 },
        { title: "Mastering useActionState & Server Forms", description: "Simplifying form pending states, errors, and submissions.", videoUrl: "https://www.youtube.com/watch?v=8pDqJVdNa44", position: 1 },
        { title: "Optimistic UI Updates with useOptimistic", description: "Instant feedback for chat messages and interactive likes.", videoUrl: "https://www.youtube.com/watch?v=7kL_wPjB-D0", position: 2 },
      ],
    },
    {
      title: "RESTful API Engineering with Express & Clean Architecture",
      description: "Design modular, testable, and secure Node.js backend services adhering to MVC, repository patterns, and robust validation.",
      price: 52.0,
      discountPercent: null,
      instructorName: "Jason Cooper",
      duration: "8hr 50min",
      thumbnailUrl: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
      lectures: [
        { title: "Express Server Setup & Middleware Pipeline", description: "Handling requests, CORS, Helmet, compression, and error handlers.", videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE", position: 0 },
        { title: "Route Handlers, Controllers & Service Layers", description: "Separating business logic from HTTP transport concerns.", videoUrl: "https://www.youtube.com/watch?v=SccSCuHhOw0", position: 1 },
        { title: "JWT Authentication & Role-based Authorization", description: "Protecting routes with middleware and httpOnly cookie storage.", videoUrl: "https://www.youtube.com/watch?v=mbsmsi7l3r4", position: 2 },
      ],
    },
    {
      title: "Complete Python Mastery: From Basics to Data Science",
      description: "Master Python programming syntax, object-oriented concepts, asynchronous programming, NumPy, Pandas, and automation scripts.",
      price: 0.0,
      discountPercent: null,
      instructorName: "Dr. Angela Barnes",
      duration: "18hr 30min",
      thumbnailUrl: "https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
      lectures: [
        { title: "Python Essentials & Data Structures", description: "Lists, tuples, dictionaries, sets, and comprehension patterns.", videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", position: 0 },
        { title: "Object-Oriented Programming & Classes", description: "Encapsulation, inheritance, polymorphism, and dunder methods.", videoUrl: "https://www.youtube.com/watch?v=JeznW_7DlB0", position: 1 },
        { title: "Data Analysis with Pandas & Matplotlib", description: "Reading datasets, cleaning dirty data, and visualizing trends.", videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", position: 2 },
      ],
    },
    {
      title: "Web Security & Ethical Hacking Essentials",
      description: "Identify and defend against OWASP Top 10 vulnerabilities including SQL injection, Cross-Site Scripting (XSS), CSRF, and SSRF.",
      price: 85.0,
      discountPercent: 15,
      instructorName: "Samir K. Patel",
      duration: "11hr 20min",
      thumbnailUrl: "https://i.ytimg.com/vi/3Kq1MIfTWCE/hqdefault.jpg",
      lectures: [
        { title: "Understanding Web Vulnerabilities & Threat Models", description: "How modern web attack surfaces work and attacker mindset.", videoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", position: 0 },
        { title: "Preventing SQL Injection & Parameterized Queries", description: "How injections happen and how ORMs protect databases.", videoUrl: "https://www.youtube.com/watch?v=2OPVViV-GQk", position: 1 },
        { title: "Securing Cookies, Headers & Content Security Policy (CSP)", description: "Configuring strict SameSite, HttpOnly, and strict CSP headers.", videoUrl: "https://www.youtube.com/watch?v=Qh_rVfO4k2A", position: 2 },
      ],
    },
    {
      title: "UI/UX Micro-Interactions & Motion Design",
      description: "Bring web interfaces to life with intentional, accessible CSS transitions, Framer Motion animations, and scroll-driven effects.",
      price: 49.0,
      discountPercent: 20,
      instructorName: "Chloe Dupont",
      duration: "5hr 45min",
      thumbnailUrl: "https://i.ytimg.com/vi/z9bZufPHFLU/hqdefault.jpg",
      lectures: [
        { title: "Principles of Motion in Product Design", description: "Timing curves, anticipation, easing, and reduced motion accessibility.", videoUrl: "https://www.youtube.com/watch?v=z9bZufPHFLU", position: 0 },
        { title: "Interactive Button States & Feedback Animations", description: "Subtle micro-interactions that communicate system state.", videoUrl: "https://www.youtube.com/watch?v=yYn9p4K9j1o", position: 1 },
        { title: "Page Transitions & Layout Morphing", description: "Creating seamless view transitions across navigation routes.", videoUrl: "https://www.youtube.com/watch?v=znbca4iQyF0", position: 2 },
      ],
    },
    {
      title: "Git, GitHub & Collaborative Open-Source Workflows",
      description: "Master branching strategies, interactive rebasing, merge conflict resolution, pull request reviews, and GitHub Actions CI/CD pipelines.",
      price: 0.0,
      discountPercent: null,
      instructorName: "Nathan Cole",
      duration: "6hr 15min",
      thumbnailUrl: "https://i.ytimg.com/vi/RGOj5yH7evk/hqdefault.jpg",
      lectures: [
        { title: "Git Fundamentals & Plumbing vs Porcelain", description: "Commits, trees, blobs, working directory, and staging area.", videoUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", position: 0 },
        { title: "Branching, Rebasing & Resolving Conflicts", description: "Clean linear git history, git rebase -i, and merge tools.", videoUrl: "https://www.youtube.com/watch?v=ecK3EnyGD8o", position: 1 },
        { title: "Automating Tests with GitHub Actions CI", description: "Writing YAML workflows to test and lint every pull request.", videoUrl: "https://www.youtube.com/watch?v=mFFXuXjVgkU", position: 2 },
      ],
    },
  ];

  for (const course of coursesData) {
    const { lectures, ...courseFields } = course;
    await prisma.course.create({
      data: {
        ...courseFields,
        lectures: {
          create: lectures,
        },
      },
    });
  }

  console.log(`Seeded ${coursesData.length} courses with lectures into Neon DB.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
