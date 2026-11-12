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
