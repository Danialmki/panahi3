"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCollaborationPopup, setShowCollaborationPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Animation for hero phrase, now looping
  const phraseWords = ["صفر", "تا", "صد", "موفقیت", "با", "پناه", "اکادمی"];
  const [visibleWords, setVisibleWords] = useState(0);
  useEffect(() => {
    // Timing for ~4s total loop (7 words)
    const wordDelay = 400;
    const endPause = 200;
    let t: any;
    if (visibleWords < phraseWords.length) {
      t = setTimeout(() => setVisibleWords(visibleWords + 1), wordDelay);
    } else {
      t = setTimeout(() => setVisibleWords(0), endPause);
    }
    return () => clearTimeout(t);
  }, [visibleWords]);

  const handleTalentAssessmentClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleCollaborationClick = () => {
    setShowCollaborationPopup(true);
  };

  const handleCollaborationPopupClose = () => {
    setShowCollaborationPopup(false);
  };

  const handleContactButtonClick = () => {
    setShowPopup(false);
    setShowCollaborationPopup(false);
    setTimeout(() => {
      setShowContactPopup(true);
    }, 100);
  };

  const handleContactPopupClose = () => {
    setShowContactPopup(false);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("09909800818");
    setCopiedMessage(true);
    setTimeout(() => {
      setCopiedMessage(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
          <div className="px-6 py-12 md:px-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  یادگیری سریع‌تر زبان‌ها با آکادمی پناه
                </h1>
                <div
                  className="text-2xl font-bold mb-3 text-yellow-300 drop-shadow hero-ad-phrase flex flex-wrap gap-2"
                  style={{
                    minHeight: 48,
                    textShadow:
                      "2px 2px 6px rgba(0,0,0,0.23), 0 2px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  {phraseWords.map((word, idx) => (
                    <span
                      key={idx}
                      className={
                        "transition-opacity duration-300" +
                        (idx < visibleWords ? " opacity-100" : " opacity-0")
                      }
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <p className="text-white/90 text-base md:text-lg mb-6">
                  دوره‌های شخصی‌سازی شده، تمرین در دنیای واقعی، و ارزیابی‌های
                  هوشمند برای هدایت سفر شما از مبتدی تا پیشرفته. اعتماد به نفس
                  خود را امروز بسازید.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/courses">
                    <Button className="bg-white text-violet-700 hover:bg-violet-50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105">
                      مشاهده دوره‌ها
                    </Button>
                  </Link>
                  <Link href="/levels">
                    <Button
                      variant="outline"
                      className="border-white !text-white hover:bg-white/10 cursor-pointer bg-transparent hover:text-white"
                    >
                      تعیین سطح خود
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-white">
                  <div>مسیرهای ساختاریافته</div>
                  <div>مربیان متخصص</div>
                  <div>ردیابی پیشرفت</div>
                </div>
              </div>
              <div className="relative h-56 md:h-72 lg:h-80">
                <div className="absolute inset-0 opacity-90">
                  <Image
                    src="/globe.svg"
                    alt="Learning illustration"
                    fill
                    className="object-contain p-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Sections */}
        <div className="mt-16 space-y-6">
          {/* Courses */}
          <div className="w-[95%] mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>مشاهده دوره‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="md:flex items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      مشاهده دوره‌های ساختاریافته برای ساخت مهارت‌ها گام به گام.
                    </p>
                    <Link href="/courses">
                      <Button className="bg-violet-600 hover:bg-violet-700 cursor-pointer">
                        برو به آنجا
                      </Button>
                    </Link>
                  </div>
                  <div className="relative flex-1 w-full h-36 md:h-44 overflow-hidden rounded-md border mt-4 md:mt-0">
                    <Image
                      src="/window.svg"
                      alt="Courses"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Levels */}
          <div className="w-[95%] mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>تعیین سطح خود</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="md:flex md:flex-row-reverse items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      یک ارزیابی ۳۰ سوالی انجام دهید تا سطح خود را تعیین کنید.
                    </p>
                    <Link href="/levels">
                      <Button className="bg-violet-600 hover:bg-violet-700 cursor-pointer">
                        برو به آنجا
                      </Button>
                    </Link>
                  </div>
                  <div className="relative flex-1 w-full h-36 md:h-44 overflow-hidden rounded-md border mt-4 md:mt-0">
                    <Image
                      src="/globe.svg"
                      alt="Levels"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blogs */}
          <div className="w-[95%] mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>مطالعه وبلاگ ما</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="md:flex items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      نکات، آموزش‌ها و بینش‌های مربیان ما.
                    </p>
                    <Link href="/blogs">
                      <Button className="bg-violet-600 hover:bg-violet-700 cursor-pointer">
                        برو به آنجا
                      </Button>
                    </Link>
                  </div>
                  <div className="relative flex-1 w-full h-36 md:h-44 overflow-hidden rounded-md border mt-4 md:mt-0">
                    <Image
                      src="/file.svg"
                      alt="Blogs"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Life School (Talent Assessment renamed) */}
          <div className="w-[95%] mx-auto" id="life-school">
            <Card>
              <CardHeader>
                <CardTitle>مدرسه زندگی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="md:flex md:flex-row-reverse items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      کشف استعدادهای خود و یافتن مسیر یادگیری مناسب بر اساس
                      توانایی‌های شما.
                    </p>
                    <Button
                      onClick={handleTalentAssessmentClick}
                      className="bg-violet-600 hover:bg-violet-700 cursor-pointer"
                    >
                      برو به آنجا
                    </Button>
                  </div>
                  <div className="relative flex-1 w-full h-36 md:h-44 overflow-hidden rounded-md border mt-4 md:mt-0">
                    <Image
                      src="/globe.svg"
                      alt="مدرسه زندگی"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration */}
          <div className="w-[95%] mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>همکاری</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="md:flex items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      فرصت‌های همکاری و مشارکت در پروژه‌های آموزشی و توسعه
                      محتوای یادگیری.
                    </p>
                    <Button
                      onClick={handleCollaborationClick}
                      className="bg-violet-600 hover:bg-violet-700 cursor-pointer"
                    >
                      برو به آنجا
                    </Button>
                  </div>
                  <div className="relative flex-1 w-full h-36 md:h-44 overflow-hidden rounded-md border mt-4 md:mt-0">
                    <Image
                      src="/window.svg"
                      alt="Collaboration"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Life School Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handlePopupClose}
        >
          <div
            className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  مدرسه زندگی
                </h3>
              </div>
              <button
                onClick={handlePopupClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              اگر می‌خواهید مسیر مناسب آینده خود را انتخاب کنید و دیگر در مورد
              آن سردرگم نباشید، برای اطلاعات بیشتر با ما تماس بگیرید. ما به شما
              کمک می‌کنیم تا بهترین مسیر یادگیری را برای خود پیدا کنید.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleContactButtonClick}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                تماس با ما
              </Button>
              <Button onClick={handlePopupClose} variant="outline">
                بستن
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Popup */}
      {showContactPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleContactPopupClose}
        >
          <div
            className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  تماس با ما
                </h3>
              </div>
              <button
                onClick={handleContactPopupClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              برای تماس با ما، روی شماره تلفن کلیک کنید تا در کلیپ‌بورد شما کپی
              شود:
            </p>
            <div className="space-y-3">
              <button
                onClick={copyPhoneNumber}
                className="w-full p-4 border-2 border-violet-600 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-violet-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-lg font-semibold text-foreground group-hover:text-violet-600">
                      09909800818
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-opacity ${
                      copiedMessage
                        ? "text-green-600"
                        : "text-muted-foreground group-hover:text-violet-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {copiedMessage ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    )}
                  </svg>
                </div>
              </button>
              {copiedMessage && (
                <p className="text-sm text-green-600 text-center">
                  ✓ شماره تلفن کپی شد
                </p>
              )}
            </div>
            <Button
              onClick={handleContactPopupClose}
              className="w-full"
              variant="outline"
            >
              بستن
            </Button>
          </div>
        </div>
      )}

      {/* Collaboration Popup */}
      {showCollaborationPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCollaborationPopupClose}
        >
          <div
            className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">همکاری</h3>
              </div>
              <button
                onClick={handleCollaborationPopupClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              ما به دنبال شرکا و همکاران پرانرژی و متعهد برای گسترش خدمات
              آموزشی‌مان هستیم. اگر علاقه‌مند به همکاری در توسعه محتوا، تدریس،
              یا پروژه‌های یادگیری هستید، با ما تماس بگیرید تا درباره فرصت‌های
              همکاری صحبت کنیم.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleContactButtonClick}
                className="flex-1 bg-violet-600 hover:bg-violet-700"
              >
                تماس با ما
              </Button>
              <Button onClick={handleCollaborationPopupClose} variant="outline">
                بستن
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
