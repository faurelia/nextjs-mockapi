import { NextResponse } from "next/server";
import z from "zod";

export async function apiHandler(handler: () => Promise<Response>) {
  try {
    return await handler();
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(e).fieldErrors,
        },
        { status: 422 },
      );
    }

    console.error(e);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
