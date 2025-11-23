"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCourseBySlug, type Course } from "@/lib/api";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch course by slug from backend
        const foundCourse = await fetchCourseBySlug(courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("Failed to load course. Please try again later.");
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The course you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/courses">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/courses" className="text-violet-600 hover:text-violet-700">
            ← Back to Courses
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={800}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.language}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
                <CardDescription className="text-lg">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">{course.lessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">{course.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">{course.students}</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">⭐ {course.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">About This Course</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* What You'll Learn */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Master fundamental concepts and principles
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Practice with real-world examples and exercises
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Build confidence through hands-on projects
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Get personalized feedback and support
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Enroll Now</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(course.originalPrice - course.price).toFixed(2)}!
                    </div>
                  )}
                </div>

                {/* Enroll Button */}
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-lg py-3 mb-4">
                  Enroll Now
                </Button>

                {/* Course Features */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Lifetime access
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Certificate of completion
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Mobile and desktop access
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
