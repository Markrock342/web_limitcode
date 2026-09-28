import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

/**
 * ลิงก์เลือกภาษา เช่น https://www.limitcode.shop/?lang=en (ส่งให้ลูกค้าต่างประเทศ)
 * บันทึกภาษาลง cookie แล้ว redirect ไป URL เดิมที่ไม่มี ?lang — หน้าถัดไปจึงเป็นภาษานั้นต่อ
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get("lang");
  url.searchParams.delete("lang");

  const response = NextResponse.redirect(url);
  if (isLocale(lang)) {
    response.cookies.set(LOCALE_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/|api/|.*\\..*).*)",
      has: [{ type: "query", key: "lang" }],
    },
  ],
};
