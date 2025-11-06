"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-[95%] md:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">
                آکادمی پناه
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              توانمندسازی دانشجویان برای تسلط بر مهارت‌های زبان انگلیسی از طریق
              دوره‌های جامع و آموزش متخصص.
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/panahacademy1" target="_blank">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Instagram className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://linkedin.com/in/panahacademy1"
                target="_blank"
              >
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              لینک‌های سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  دوره‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  پنل کاربری
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  ورود
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              اطلاعات تماس
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-violet-600" />
                <div>
                  <p className="text-foreground font-medium">تلفن</p>
                  <p className="text-muted-foreground">09909800818</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-violet-600 mt-1" />
                <div>
                  <p className="text-foreground font-medium">ایمیل</p>
                  <p className="text-muted-foreground">
                    panahacademyorg@gmial.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-violet-600 mt-1" />
                <div>
                  <p className="text-foreground font-medium">آدرس</p>
                  <p className="text-muted-foreground">فعلا نداریم : )</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              ساعات کاری
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>شنبه - پنجشنبه</span>
                <span>9 صبح تا 12 شب</span>
              </div>
              <div className="flex justify-between">
                <span>جمعه</span>
                <span>تعطیل</span>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 cursor-pointer">
                همین امروز شروع کنید
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © ۱۴۰۳ آکادمی پناه. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                شرایط استفاده
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                سیاست کوکی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
