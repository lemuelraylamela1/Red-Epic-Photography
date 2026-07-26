import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy placeholder for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="section-padding bg-white pt-32">
        <div className="container-page max-w-3xl">
          <p className="mb-4 text-xs tracking-[0.28em] text-accent uppercase">
            Legal
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-muted leading-relaxed">
            This is a placeholder privacy policy for the {siteConfig.name}{" "}
            proposal website. Before launch, replace this page with the
            studio&apos;s final privacy practices covering inquiry forms,
            analytics, cookies, and image usage rights.
          </p>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-body/80">
            <p>
              Inquiry details submitted through the contact form are used only
              to respond to booking requests and related communication.
            </p>
            <p>
              Portfolio images remain the property of {siteConfig.name} unless
              otherwise agreed in writing with the client.
            </p>
            <p>
              For privacy questions, contact{" "}
              <a
                className="text-primary underline-offset-4 hover:underline"
                href="mailto:redepicphoto@gmail.com">
                redepicphoto@gmail.com
              </a>
              .
            </p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex text-sm font-medium text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
