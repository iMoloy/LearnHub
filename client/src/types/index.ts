export interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string;
  instructorName: string | null;
  duration: string | null;
  discountPercent: number | null;
  lectureCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lecture {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videoUrl: string;
  position: number;
  createdAt: string;
}

export interface CourseWithLectures extends Course {
  lectures: Lecture[];
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Certificate {
  id: number;
  certCode: string;
  title: string;
  issuer: string;
  instructor: string;
  issueDate: string;
  grade: string;
  skills: string[];
  verified: boolean;
  credentialUrl?: string | null;
  createdAt: string;
}

export interface LearningProgress {
  id: number;
  courseId?: number | null;
  title: string;
  instructor: string;
  completedLectures: number;
  totalLectures: number;
  percent: number;
  status: string;
  lastWatched: string;
  timeSpent: string;
  createdAt: string;
}

export interface Discussion {
  id: number;
  title: string;
  category: string;
  author: string;
  avatar: string;
  replies: number;
  upvotes: number;
  time: string;
  badge?: string | null;
  courseLink?: string | null;
  courseTitle?: string | null;
  createdAt: string;
}

export interface Quiz {
  id: number;
  title: string;
  course: string;
  courseId?: number | null;
  questions: number;
  duration: string;
  difficulty: string;
  passScore: string;
  status: string;
  bestScore?: string | null;
  createdAt: string;
}
