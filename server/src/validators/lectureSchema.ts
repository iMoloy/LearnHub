import { z } from "zod";

const YOUTUBE_HOST_SET = new Set([
  "www.youtube.com",
  "youtube.com",
  "youtu.be",
  "www.youtube-nocookie.com",
]);

const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const youtubeUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .refine(
    (val) => {
      try {
        const parsed = new URL(val);
        return (
          parsed.protocol === "https:" &&
          YOUTUBE_HOST_SET.has(parsed.hostname) &&
          YOUTUBE_ID_REGEX.test(val)
        );
      } catch {
        return false;
      }
    },
    { message: "Must be a valid https:// YouTube video URL" }
  );

export const courseIdLectureParamSchema = z.object({
  courseId: z.coerce.number().int().positive("Invalid course ID"),
});

export const lectureIdParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid lecture ID"),
});

export const createLectureSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().trim().max(2000).default(""),
  videoUrl: youtubeUrl,
  position: z.coerce.number().int().min(0).default(0),
});

export const updateLectureSchema = createLectureSchema.partial();
