import { prisma } from "../config/prisma.js";

export interface LectureCreateInput {
  courseId: number;
  title: string;
  description: string;
  videoUrl: string;
  position: number;
}

export type LectureUpdateInput = Partial<Omit<LectureCreateInput, "courseId">>;

export const lectureModel = {
  findByCourseId(courseId: number) {
    return prisma.lecture.findMany({
      where: { courseId },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });
  },

  findById(id: number) {
    return prisma.lecture.findUnique({
      where: { id },
    });
  },

  create(data: LectureCreateInput) {
    return prisma.lecture.create({
      data,
    });
  },

  update(id: number, data: LectureUpdateInput) {
    return prisma.lecture.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.lecture.delete({
      where: { id },
    });
  },
};
