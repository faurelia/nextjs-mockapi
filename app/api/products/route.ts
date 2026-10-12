import { db } from "@/lib/db";
import { productsTable } from "@/lib/db/schema";
import { createProductSchema } from "@/lib/validations/product";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";

export const GET = api(
  async () => {
    const data = await db.select().from(productsTable);
    return NextResponse.json({ data });
  },
  { auth: "none" },
);

export const POST = api(async ({ req }) => {
  const data = createProductSchema.parse(await req.json());
  const [product] = await db.insert(productsTable).values(data).returning();

  if (!product)
    throw new AppError(
      500,
      "PRODUCT_CREATE_FAILED",
      "Failed to create product",
    );

  return NextResponse.json({ data: product }, { status: 201 });
});
