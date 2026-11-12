import { prisma } from "../config/prisma.js";

export interface CourseCreateInput {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  instructorName?: string | null;
  duration?: string | null;
  discountPercent?: number | null;
}

export type CourseUpdateInput = Partial<CourseCreateInput>;

export const courseModel = {
  async findAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          thumbnailUrl: true,
          instructorName: true,
          duration: true,
          discountPercent: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { lectures: true },
          },
        },
      }),
      prisma.course.count(),
    ]);

    const items = courses.map(({ _count, price, ...rest }) => ({
      ...rest,
      price: price.toString(),
      lectureCount: _count.lectures,
    }));

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  async findById(id: number) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lectures: {
          orderBy: [{ position: "asc" }, { id: "asc" }],
        },
      },
    });

    if (!course) return null;

    return {
      ...course,
      price: course.price.toString(),
      lectureCount: course.lectures.length,
    };
  },

  async create(data: CourseCreateInput) {
    const course = await prisma.course.create({
      data,
    });
    return {
      ...course,
      price: course.price.toString(),
    };
  },

  async update(id: number, data: CourseUpdateInput) {
    const course = await prisma.course.update({
      where: { id },
      data,
    });
    return {
      ...course,
      price: course.price.toString(),
    };
  },

  delete(id: number) {
    return prisma.course.delete({
      where: { id },
    });
  },
};
