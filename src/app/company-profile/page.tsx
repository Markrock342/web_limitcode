import type { Metadata } from "next";
import { CP_COVER } from "@/lib/profile";
import { CompanyProfileDoc } from "./CompanyProfileDoc";
import "./company-profile.css";

export const metadata: Metadata = {
  title: "Company Profile — LIMIT CODE STUDIO",
  description: CP_COVER.description,
};

export default function CompanyProfilePage() {
  return <CompanyProfileDoc />;
}
