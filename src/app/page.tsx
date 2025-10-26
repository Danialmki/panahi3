import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
                <p className="text-white/90 text-base md:text-lg mb-6">
                  دوره‌های شخصی‌سازی شده، تمرین در دنیای واقعی، و ارزیابی‌های
                  هوشمند برای هدایت سفر شما از مبتدی تا پیشرفته. اعتماد به نفس
                  خود را امروز بسازید.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/courses">
                    <Button className="bg-white text-violet-700 hover:bg-violet-50 cursor-pointer">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
