export const roles = ["ADMIN", "COACH", "STUDENT", "PARENT"] as const;
export type Role = (typeof roles)[number];

export type Money = Readonly<{ amountPaise: number; currency: "INR" }>;

export type ApiError = Readonly<{
  statusCode: number;
  code: string;
  message: string;
  requestId: string;
  details?: Record<string, string[]>;
}>;

export type Paginated<T> = Readonly<{
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}>;
