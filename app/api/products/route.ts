import { db } from "@/lib/db";
import { productsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createProductSchema } from "@/lib/validations/product";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const products = await db.select().from(productsTable);
    return NextResponse.json(products);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createProductSchema.parse(await request.json());

    const [product] = await db.insert(productsTable).values(data).returning();

    if (!product) {
      return NextResponse.json(
        { error: "Failed to add product" },
        { status: 400 },
      );
    }

    return NextResponse.json(product, { status: 201 });
  });
}
