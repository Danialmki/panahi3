"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { fetchCoursesByLevel, type Course } from "@/lib/api";

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch courses when component mounts or filters change
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCoursesByLevel(selectedLevel, selectedLanguage);
        setCourses(data);
        setCurrentSlide(0); // Reset to first slide when filters change
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [selectedLevel, selectedLanguage]);

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];
  const languages = ["all", "English", "Russian", "Spanish"];

  // Carousel navigation functions
  const coursesPerSlide = 4;
  const totalSlides = Math.ceil(courses.length / coursesPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Language Learning Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of language courses designed to
            help you master English, Russian, and Spanish at your own pace
          </p>
        </div>

        {/* Language Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === language
                  ? "bg-blue-600 text-white"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {language === "all" ? "All Languages" : language}
            </button>
          ))}
        </div>

        {/* Level Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === level
                  ? "bg-violet-600 text-white"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {level === "all" ? "All Levels" : level}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            <p className="mt-4 text-muted-foreground">Loading courses...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="col-span-full text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-violet-600 hover:bg-violet-700 cursor-pointer"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Courses Carousel */}
        {!loading && !error && courses.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={prevSlide}
                disabled={totalSlides <= 1}
                variant="outline"
                className="p-2"
              >
                ←
              </Button>
              <div className="flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-violet-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextSlide}
                disabled={totalSlides <= 1}
                variant="outline"
                className="p-2"
              >
                →
              </Button>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {courses
                      .slice(
                        slideIndex * coursesPerSlide,
                        (slideIndex + 1) * coursesPerSlide
                      )
                      .map((course) => (
                        <Card
                          key={course.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="relative">
                            <Image
                              src={course.image}
                              alt={course.title}
                              width={400}
                              height={250}
                              className="w-full h-48 object-cover"
                            />
                            {course.originalPrice && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {Math.round(
                                  ((course.originalPrice - course.price) /
                                    course.originalPrice) *
                                    100
                                )}
                                % OFF
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                              {course.level}
                            </div>
                            <div className="absolute bottom-2 right-2 bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs">
                              {course.language}
                            </div>
                          </div>

                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg line-clamp-2">
                              {course.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {course.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pt-0">
                            {/* Course Stats */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                              <div className="flex items-center space-x-4">
                                <span>📚 {course.lessons} lessons</span>
                                <span>⏱️ {course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>⭐ {course.rating}</span>
                                <span>({course.students})</span>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-foreground">
                                  ${course.price}
                                </span>
                                {course.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${course.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <Link
                                href={`/courses/${course.blogId}`}
                                className="ml-auto"
                              >
                                <Button
                                  variant="outline"
                                  className="cursor-pointer"
                                >
                                  Explore More
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different level or check back later for new
              courses.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
