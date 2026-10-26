import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, Lock, UserCheck, Eye, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | FOXAL Natural Incense',
  description:
    'Read the official FOXAL Privacy Policy. Learn how we collect, protect, process, and respect your personal data when using our store and services.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' },
          ]}
          className="mb-8"
        />

        <div className="bg-white p-6 sm:p-12 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-10">
          {/* Title Header */}
          <div className="border-b border-[#E3D4BD] pb-6">
            <div className="inline-flex items-center gap-2 bg-[#F6EFE4] text-[#C8922A] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Privacy Policy</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F0D0B]">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#7A5230] mt-2 font-medium">
              Last updated: July 10, 2026
            </p>
          </div>

          {/* Intro Narrative */}
          <div className="space-y-4 text-sm text-[#3E3834] leading-relaxed">
            <p>
              <strong>Foxal</strong> operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the &ldquo;Services&rdquo;). Foxal is powered by Shopify, which enables us to provide the Services to you.
            </p>
            <p>
              This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
            </p>
          </div>

          <hr className="border-[#E3D4BD]/80" />

          {/* 1. Personal Information We Collect or Process */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B] flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#C8922A]" />
              Personal Information We Collect or Process
            </h2>
            <p className="text-sm text-[#5A534E] leading-relaxed">
              When we use the term &ldquo;personal information,&rdquo; we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Contact Details</h4>
                <p className="text-xs text-[#5A534E]">
                  Your name, address, billing address, shipping address, phone number, and email address.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Financial Information</h4>
                <p className="text-xs text-[#5A534E]">
                  Credit card, debit card, and financial account numbers, payment card information, transaction details, form of payment, payment confirmation and other payment details.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Account Information</h4>
                <p className="text-xs text-[#5A534E]">
                  Your username, password, security questions, preferences and settings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Transaction Information</h4>
                <p className="text-xs text-[#5A534E]">
                  Items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Communications with Us</h4>
                <p className="text-xs text-[#5A534E]">
                  Information you include in communications with us, for example, when sending a customer support inquiry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD]/80">
                <h4 className="font-semibold text-sm text-[#0F0D0B] mb-1">Device &amp; Usage Information</h4>
                <p className="text-xs text-[#5A534E]">
                  Information about your device, browser, network connection, IP address, unique identifiers, and how/when you navigate the Services.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Personal Information Sources */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              Personal Information Sources
            </h2>
            <p className="text-sm text-[#5A534E]">
              We may collect personal information from the following sources:
            </p>
            <ul className="space-y-2 text-sm text-[#5A534E] list-disc pl-5">
              <li>
                <strong>Directly from you:</strong> When you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;
              </li>
              <li>
                <strong>Automatically through the Services:</strong> From your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;
              </li>
              <li>
                <strong>From our service providers:</strong> When we engage them to enable certain technology and when they collect or process your personal information on our behalf;
              </li>
              <li>
                <strong>From our partners or other third parties.</strong>
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Personal Information */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              How We Use Your Personal Information
            </h2>
            <p className="text-sm text-[#5A534E]">
              Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:
            </p>

            <div className="space-y-3 text-sm text-[#5A534E]">
              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD]">
                <strong className="text-[#0F0D0B] block mb-1">Provide, Tailor, and Improve the Services</strong>
                <p>
                  To provide you with the Services, perform our contract with you, process payments, fulfill orders, remember preferences, send account-related notifications, manage returns/exchanges, enable reviews, and personalize recommendations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD]">
                <strong className="text-[#0F0D0B] block mb-1">Marketing and Advertising</strong>
                <p>
                  To send promotional communications by email, text message, or postal mail, and to show online advertisements for products or services based on items previously purchased or added to your cart.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD]">
                <strong className="text-[#0F0D0B] block mb-1">Security and Fraud Prevention</strong>
                <p>
                  To authenticate your account, provide a secure payment and shopping experience, detect and investigate fraudulent or malicious activity, and protect public safety. We highly recommend you do not share your credentials with anyone else.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD]">
                <strong className="text-[#0F0D0B] block mb-1">Communicating with You &amp; Legal Reasons</strong>
                <p>
                  To deliver customer support, maintain business relationships, comply with applicable laws, respond to lawful subpoenas or court orders, and enforce our terms and policies.
                </p>
              </div>
            </div>
          </section>

          {/* 4. How We Disclose Personal Information */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              How We Disclose Personal Information
            </h2>
            <p className="text-sm text-[#5A534E]">
              In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy:
            </p>
            <ul className="space-y-2 text-sm text-[#5A534E] list-disc pl-5">
              <li>
                <strong>Shopify &amp; Service Providers:</strong> Third parties performing services on our behalf (IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
              </li>
              <li>
                <strong>Business and Marketing Partners:</strong> For personalized advertising based on your online activity. You may have the right to opt out of targeted advertising depending on your jurisdiction.
              </li>
              <li>
                <strong>User Consent &amp; Direct Requests:</strong> When you direct us to disclose information, such as shipping partners or social media widgets.
              </li>
              <li>
                <strong>Corporate Affiliates:</strong> Within our corporate group.
              </li>
              <li>
                <strong>Business Transactions &amp; Legal Obligations:</strong> In connection with mergers, acquisitions, bankruptcy, or legal discovery proceedings.
              </li>
            </ul>
          </section>

          {/* 5. Relationship with Shopify */}
          <section className="space-y-3 p-5 rounded-2xl bg-[#F6EFE4]/60 border border-[#E3D4BD]">
            <h2 className="font-serif text-xl font-bold text-[#0F0D0B] flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-[#C8922A]" />
              Relationship with Shopify
            </h2>
            <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
              The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit will be transmitted to and shared with Shopify as well as third parties located in countries other than where you reside.
            </p>
            <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
              In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features. In these circumstances, Shopify is responsible for the processing of your personal information. To learn more about how Shopify uses your personal information and any rights you may have, visit the{' '}
              <a
                href="https://privacy.shopify.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8922A] font-semibold underline"
              >
                Shopify Consumer Privacy Policy
              </a>.
            </p>
          </section>

          {/* 6. Third Party Websites, Children Data, Security & Retention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Third Party Websites and Links</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                If you follow links to sites not affiliated with or controlled by us, you should review their privacy policies. We do not guarantee and are not responsible for the privacy or security of such third-party sites.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Children&apos;s Data</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                The Services are not intended for children, and we do not knowingly collect personal information about children under 16 years of age. If a child has provided us with data, parents may contact us for deletion.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Security</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                While we implement robust security protocols, no measure is impenetrable and we cannot guarantee &ldquo;perfect security.&rdquo; We recommend avoiding unsecure channels for sensitive details.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Retention</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                We retain your personal information based on operational needs, such as maintaining your account, providing Services, resolving disputes, and adhering to statutory retention requirements.
              </p>
            </section>
          </div>

          {/* 7. Your Rights and Choices */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B] flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-[#C8922A]" />
              Your Rights and Choices
            </h2>
            <p className="text-sm text-[#5A534E]">
              Depending on where you live, you may have some or all of the following rights in relation to your personal information:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#5A534E]">
              <li className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D4BD]">
                <strong>Right to Access / Know:</strong> Request access to personal information that we hold about you.
              </li>
              <li className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D4BD]">
                <strong>Right to Delete:</strong> Request that we delete personal information we maintain about you.
              </li>
              <li className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D4BD]">
                <strong>Right to Correct:</strong> Request that we correct inaccurate personal information.
              </li>
              <li className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D4BD]">
                <strong>Right of Portability:</strong> Receive a copy of your personal data and transfer it to a third party.
              </li>
            </ul>

            <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed pt-2">
              <strong>Managing Communication Preferences:</strong> You may opt out of promotional emails at any time using the unsubscribe link. Non-promotional transaction messages (order confirmations, invoices, tracking updates) will still be sent.
            </p>
          </section>

          {/* 8. Complaints & International Transfers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Complaints</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                If you have complaints regarding data processing, please contact us. Depending on where you reside, you may also lodge a complaint with your local data protection authority.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">International Transfers</h3>
              <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
                Your personal information may be transferred and processed outside your country of residence, utilizing recognized contractual transfer mechanisms like Standard Contractual Clauses.
              </p>
            </section>
          </div>

          {/* 9. Contact Card (Official Foxal Details) */}
          <div className="rounded-3xl bg-[#0F0D0B] text-[#FAF7F2] p-6 sm:p-8 border border-[#C8922A]/40 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-[#DFB15B] mb-2">
              Contacting FOXAL Regarding Privacy
            </h3>
            <p className="text-xs sm:text-sm text-[#CFCAC6] mb-6">
              Should you have any questions about our privacy practices, wish to exercise your rights, or submit an inquiry, please contact us through any of the following channels:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a
                href="tel:+919427410210"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1715] border border-[#C8922A]/30 hover:border-[#DFB15B] transition-colors"
              >
                <Phone className="h-5 w-5 text-[#DFB15B] shrink-0" />
                <div>
                  <span className="text-[#AFA8A2] block text-[10px] uppercase tracking-wider">Phone</span>
                  <span className="font-semibold text-white">+91 942 741 0210</span>
                </div>
              </a>

              <a
                href="mailto:login.foxal@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1715] border border-[#C8922A]/30 hover:border-[#DFB15B] transition-colors"
              >
                <Mail className="h-5 w-5 text-[#DFB15B] shrink-0" />
                <div>
                  <span className="text-[#AFA8A2] block text-[10px] uppercase tracking-wider">Email</span>
                  <span className="font-semibold text-white">login.foxal@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1715] border border-[#C8922A]/30">
                <MapPin className="h-5 w-5 text-[#DFB15B] shrink-0" />
                <div>
                  <span className="text-[#AFA8A2] block text-[10px] uppercase tracking-wider">Address</span>
                  <span className="font-semibold text-white leading-tight block">
                    01 Paras Row House, nr Krutika School, Madhav Mall, Thakkarnagar, Ahmedabad 382350, GJ, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
