import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { DrizzleQueryError } from "drizzle-orm";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
import { AppError, Errors } from "./errors";

type AuthMode = "required" | "optional" | "none";
type SessionData = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
type User = SessionData["user"];

type Ctx<P, A extends AuthMode> = {
  req: NextRequest;
  params: P;
  session: A extends "required"
    ? SessionData
    : A extends "optional"
      ? SessionData | null
      : null;
  user: A extends "required" ? User : A extends "optional" ? User | null : null;
};

export function api<P = {}, A extends AuthMode = "required">(
  handler: (ctx: Ctx<P, A>) => Promise<Response | object>,
  opts: { auth?: A } = {},
) {
  const mode: AuthMode = opts.auth ?? "required";

  return async (req: NextRequest, route: { params: Promise<P> }) => {
    try {
      const session =
        mode === "none"
          ? null
          : await auth.api.getSession({ headers: req.headers });
      if (mode === "required" && !session) throw Errors.unauthorized();

      const result = await handler({
        req,
        params: await route.params,
        session,
        user: session?.user ?? null,
      } as Ctx<P, A>);

      return result instanceof Response
        ? result
        : NextResponse.json({ data: result });
    } catch (err) {
      return toErrorResponse(err);
    }
  };
}

// Postgres codes. Drizzle wraps the driver error, so the real one is on `.cause`
function pgCode(err: unknown): string | undefined {
  const e = err as any;
  return e?.cause?.code ?? e?.code;
}

function toErrorResponse(err: unknown) {
  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          details: err.flatten().fieldErrors,
        },
      },
      { status: 400 },
    );
  }

  if (err instanceof AppError) {
    return NextResponse.json(
      { error: { code: err.code, message: err.message, details: err.details } },
      { status: err.status },
    );
  }

  // Better Auth errors (thrown by auth.api.* calls inside your handlers)
  if (err instanceof APIError) {
    return NextResponse.json(
      { error: { code: err.body?.code ?? "AUTH_ERROR", message: err.message } },
      { status: typeof err.status === "number" ? err.status : 400 },
    );
  }

  // Drizzle / database
  if (err instanceof DrizzleQueryError || pgCode(err)) {
    switch (pgCode(err)) {
      case "23505": // unique_violation
        return NextResponse.json(
          { error: { code: "CONFLICT", message: "Already exists" } },
          { status: 409 },
        );
      case "23503": // foreign_key_violation
        return NextResponse.json(
          {
            error: {
              code: "INVALID_REFERENCE",
              message: "Related record not found",
            },
          },
          { status: 409 },
        );
      case "23502": // not_null_violation
        return NextResponse.json(
          {
            error: {
              code: "VALIDATION_ERROR",
              message: "Missing required field",
            },
          },
          { status: 400 },
        );
    }
  }

  console.error(err);
  return NextResponse.json(
    { error: { code: "INTERNAL", message: "Something went wrong" } },
    { status: 500 },
  );
}
