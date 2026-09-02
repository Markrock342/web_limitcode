import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ContactPageView } from "@/components/contact/ContactPageView";
import { CONTACT, LINE_ID, LINE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ติดต่อเรา — คุณ Mark Project Manager",
  description: `ติดต่อ LIMIT CODE STUDIO ผ่าน ${CONTACT.personThai} (${CONTACT.person}) โทร ${CONTACT.phoneDisplay} อีเมล ${CONTACT.email} Facebook Page หรือ LINE OA ${LINE_ID}`,
  path: "/contact",
  keywords: [
    "ติดต่อ LIMIT CODE STUDIO",
    "Mark Kitti",
    "คุณ Mark",
    "Project Manager",
    "โทร 084-265-2544",
    "limitcodestudio@gmail.com",
    "LINE OA @026iaomj",
    "เพจทางการ LIMIT CODE STUDIO",
    "ฟรีแลนซ์ทำระบบ",
  ],
});

function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.person,
    alternateName: CONTACT.personThai,
    jobTitle: CONTACT.role,
    worksFor: {
      "@type": "Organization",
      name: "LIMIT CODE STUDIO",
    },
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    url: CONTACT.facebookHref,
    sameAs: [CONTACT.facebookHref, CONTACT.pageFacebookHref, LINE_URL],
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd()} />
      <Navbar />
      <ContactPageView />
      <Footer />
    </>
  );
}
