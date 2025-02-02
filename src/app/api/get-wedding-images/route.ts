// src/app/api/get-wedding-images/route.ts

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const files = fs.readdirSync(imagesDirectory);

  // Filter images that start with 'Wedding-'
  const weddingImages = files
    .filter((file) => file.startsWith("Wedding-") && file.endsWith(".jpg"))
    .map((f) => `/images/${f}`);
  return NextResponse.json(weddingImages);
}
