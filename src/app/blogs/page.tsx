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
import { fetchBlogPosts } from "@/lib/api";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
}

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await fetchBlogPosts(
          selectedCategory === "all" ? undefined : selectedCategory
        );
        setBlogPosts(blogs);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [selectedCategory]);

  const categories = [
    "all",
    "Grammar",
    "Business",
    "Writing",
    "Pronunciation",
    "Exam Preparation",
    "Conversation",
    "Literature",
    "Academic",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">در حال بارگذاری مطالب...</p>
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            وبلاگ یادگیری انگلیسی
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            مجموعه جامع دوره‌ها و منابع یادگیری انگلیسی ما را بررسی کنید که برای
            کمک به تسلط بر زبان طراحی شده است
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-violet-600 text-white"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {category === "all" ? "همه مطالب" : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                {post.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {Math.round(
                      ((post.originalPrice - post.price) / post.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {post.level}
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground bg-violet-100 text-violet-800 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.publishDate}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span>📚 {post.lessons} lessons</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⭐ {post.rating}</span>
                    <span>({post.students})</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-foreground">
                      ${post.price}
                    </span>
                    {post.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${post.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    by {post.instructor}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700 cursor-pointer">
                    ثبت‌نام کنید
                  </Button>
                  <Link href={`/blogs/${post.id}`}>
                    <Button variant="outline" className="cursor-pointer">
                      ادامه مطلب
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              مطلبی یافت نشد
            </h3>
            <p className="text-muted-foreground">
              دسته‌بندی دیگری را انتخاب کنید یا بعداً برای مطالب جدید بررسی
              کنید.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
