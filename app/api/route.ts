// import puppeteer from "puppeteer";
import { chromium } from "playwright";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="mypdf.pdf"',
    },
  });
};
