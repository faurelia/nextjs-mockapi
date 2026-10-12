export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const Errors = {
  unauthorized: () => new AppError(401, "UNAUTHORIZED", "Please sign in"),
  forbidden: () => new AppError(403, "FORBIDDEN", "Not allowed"),
  notFound: (what = "Resource") =>
    new AppError(404, "NOT_FOUND", `${what} not found`),
};
