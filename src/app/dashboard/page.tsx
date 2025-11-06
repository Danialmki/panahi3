"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [latestLevelResult, setLatestLevelResult] = useState<{
    language: string;
    score: number;
    total: number;
    level: string;
    completedAt: string;
  } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dashboard stats - Empty by default, filled when user enrolls/buys courses
  const dashboardStats = {
    coursesEnrolled: 0,
    coursesCompleted: 0,
    certificatesEarned: 0,
    totalHours: 0,
  };

  const recentCourses: any[] = [];

  useEffect(() => {
    // Load user data from localStorage
    const loadUserData = () => {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");
      const storedImage = localStorage.getItem("profileImage");
      const lastAssessment = localStorage.getItem("levelAssessment:lastResult");

      if (storedName) {
        const [firstName, lastName] = storedName.split(" ");
        setUserData((prev) => ({
          ...prev,
          firstName: firstName || "",
          lastName: lastName || "",
          email: storedEmail || "",
        }));
      } else if (storedEmail) {
        setUserData((prev) => ({
          ...prev,
          email: storedEmail,
        }));
      }

      if (storedImage) {
        setProfileImage(storedImage);
      }

      if (lastAssessment) {
        try {
          setLatestLevelResult(JSON.parse(lastAssessment));
        } catch (_) {}
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsImageUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setProfileImage(imageData);
      // Save to localStorage
      localStorage.setItem("profileImage", imageData);
      setIsImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update localStorage
      localStorage.setItem(
        "userName",
        `${userData.firstName} ${userData.lastName}`
      );
      localStorage.setItem("userEmail", userData.email);

      setIsEditing(false);
      console.log("Profile updated successfully:", userData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original values
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName) {
      const [firstName, lastName] = storedName.split(" ");
      setUserData((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        email: storedEmail || "",
      }));
    }

    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profileImage");

    // Redirect to home page
    window.location.href = "/";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          خوش برگشتید، {userData.firstName || "یادگیرنده"}!
        </h2>
        <p className="text-white/90">
          سفر یادگیری خود را با آکادمی پناه ادامه دهید
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">
                {dashboardStats.coursesEnrolled}
              </div>
              <div className="text-sm text-muted-foreground">
                دوره‌های ثبت‌نام شده
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-xs uppercase text-muted-foreground mb-1">
                آخرین سطح
              </div>
              {latestLevelResult ? (
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    {latestLevelResult.level}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {latestLevelResult.language} • {latestLevelResult.score}/
                    {latestLevelResult.total}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  نتیجه‌ای هنوز ثبت نشده
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dashboardStats.coursesCompleted}
              </div>
              <div className="text-sm text-muted-foreground">تکمیل شده</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {dashboardStats.certificatesEarned}
              </div>
              <div className="text-sm text-muted-foreground">گواهینامه‌ها</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {dashboardStats.totalHours}
              </div>
              <div className="text-sm text-muted-foreground">ساعت آموزش</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>دوره‌های اخیر</CardTitle>
          <CardDescription>پیشرفت یادگیری خود را پیگیری کنید</CardDescription>
        </CardHeader>
        <CardContent>
          {recentCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                هنوز دوره‌ای ثبت‌نام نشده است
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                دوره‌های مورد علاقه خود را جستجو کنید و شروع به یادگیری کنید
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{course.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-violet-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-violet-100 text-violet-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>اقدامات سریع</CardTitle>
          <CardDescription>از جایی که رها کرده‌اید ادامه دهید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 cursor-pointer">
              <span className="text-lg">📚</span>
              <span>مرور دوره‌ها</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <span className="text-lg">🏆</span>
              <span>مشاهده گواهینامه‌ها</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <span className="text-lg">📊</span>
              <span>گزارش پیشرفت</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          تنظیمات پروفایل
        </h2>
        <p className="text-muted-foreground">
          تنظیمات حساب کاربری و اطلاعات پروفایل خود را مدیریت کنید
        </p>
      </div>

      {/* Profile Image Section */}
      <Card>
        <CardHeader>
          <CardTitle>عکس پروفایل</CardTitle>
          <CardDescription>
            یک عکس پروفایل آپلود کنید تا حساب کاربری خود را شخصی‌سازی کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profileImage || undefined} alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {userData.firstName
                    ? userData.firstName.charAt(0).toUpperCase()
                    : userData.email
                    ? userData.email.charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              {isImageUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="text-white text-sm">Uploading...</div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={triggerFileInput}
                disabled={isImageUploading}
                className="cursor-pointer"
              >
                {profileImage ? "تغییر عکس" : "آپلود عکس"}
              </Button>
              {profileImage && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileImage(null);
                    localStorage.removeItem("profileImage");
                  }}
                  className="cursor-pointer"
                >
                  حذف
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <p className="text-sm text-muted-foreground text-center max-w-md">
              فرمت‌های پشتیبانی شده: JPG، PNG، GIF. حداکثر حجم فایل: ۵ مگابایت.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>اطلاعات شخصی</CardTitle>
              <CardDescription>
                جزئیات شخصی و اطلاعات تماس خود را به‌روز کنید
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              >
                ویرایش پروفایل
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  انصراف
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>
              <Input
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="نام خود را وارد کنید"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="نام خانوادگی خود را وارد کنید"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن</Label>
              <Input
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="شماره تلفن خود را وارد کنید"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">بیوگرافی</Label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="درباره خود بگویید..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات حساب کاربری</CardTitle>
          <CardDescription>
            تنظیمات حساب کاربری و امنیتی خود را مدیریت کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">تغییر رمز عبور</h3>
                <p className="text-sm text-muted-foreground">
                  رمز عبور خود را به‌روز کنید تا حساب کاربری خود را ایمن نگه
                  دارید
                </p>
              </div>
              <Button variant="outline" className="cursor-pointer">
                تغییر رمز عبور
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">اعلان‌های ایمیل</h3>
                <p className="text-sm text-muted-foreground">
                  تنظیمات اعلان‌های ایمیل خود را مدیریت کنید
                </p>
              </div>
              <Button variant="outline" className="cursor-pointer">
                مدیریت اعلان‌ها
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-red-600">حذف حساب کاربری</h3>
                <p className="text-sm text-muted-foreground">
                  حساب کاربری و همه داده‌های خود را برای همیشه حذف کنید
                </p>
              </div>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
              >
                حذف حساب کاربری
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-red-600">خروج</h3>
                <p className="text-sm text-muted-foreground">
                  از حساب کاربری خود خارج شوید
                </p>
              </div>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                onClick={handleLogout}
              >
                خروج
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-card p-1 rounded-lg shadow-sm mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-violet-600 text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            پنل کاربری
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-violet-600 text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            پروفایل و تنظیمات
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" ? renderDashboardTab() : renderProfileTab()}
      </div>
      <Footer />
    </div>
  );
}
