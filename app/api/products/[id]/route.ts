import { db } from "@/lib/db";
import { productsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { updateProductSchema } from "@/lib/validations/product";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, +id))
      .limit(1);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;
    const data = updateProductSchema.parse(await request.json());

    const [product] = await db
      .update(productsTable)
      .set(data)
      .where(eq(productsTable.id, +id))
      .returning();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  });
}

export async function DELETE(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [product] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, +id))
      .returning();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
