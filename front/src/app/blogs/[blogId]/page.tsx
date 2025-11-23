"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { fetchBlogPostBySlug, type BlogPost } from "@/lib/api";

interface BlogData {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  lastUpdated: string;
  features: string[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
}

export default function BlogPage() {
  const params = useParams();
  const blogId = params.blogId as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog by slug from backend
        const foundBlog = await fetchBlogPostBySlug(blogId);
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog. Please try again later.");
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              {error || "The blog post you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/blogs">
              <Button className="bg-violet-600 hover:bg-violet-700 cursor-pointer">
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock blog data for additional fields not in API - in a real app, this would come from an API
  const blogData: Record<string, BlogData> = {
    "english-grammar-fundamentals": {
      id: "english-grammar-fundamentals",
      title: "English Grammar Fundamentals",
      description:
        "Master the basics of English grammar with comprehensive lessons covering parts of speech, sentence structure, and common grammar rules.",
      content: `
        <p>Welcome to our comprehensive English Grammar Fundamentals course! This course is designed for learners who want to build a strong foundation in English grammar.</p>
        
        <h2>What You'll Learn</h2>
        <p>In this course, you'll explore the fundamental building blocks of English grammar, from basic sentence structure to complex grammatical concepts. Our step-by-step approach ensures that you understand each concept before moving to the next.</p>
        
        <h2>Course Highlights</h2>
        <ul>
          <li>Interactive lessons with real-world examples</li>
          <li>Practice exercises and quizzes</li>
          <li>Personalized feedback from instructors</li>
          <li>Certificate upon completion</li>
          <li>Lifetime access to course materials</li>
        </ul>
        
        <h2>Who This Course Is For</h2>
        <p>This course is perfect for:</p>
        <ul>
          <li>English language learners at the beginner level</li>
          <li>Students preparing for English proficiency tests</li>
          <li>Professionals looking to improve their written communication</li>
          <li>Anyone who wants to strengthen their grammar foundation</li>
        </ul>
      `,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
      price: 49.99,
      originalPrice: 79.99,
      duration: "8 weeks",
      level: "Beginner",
      lessons: 24,
      students: 1250,
      rating: 4.8,
      instructor: "Dr. Sarah Johnson",
      lastUpdated: "December 2024",
      features: [
        "24 comprehensive video lessons",
        "Downloadable study materials",
        "Interactive quizzes and exercises",
        "Certificate of completion",
        "Lifetime access",
        "Mobile-friendly content",
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Parts of Speech",
          topics: [
            "Nouns and Pronouns",
            "Verbs and Tenses",
            "Adjectives and Adverbs",
          ],
        },
        {
          week: 2,
          title: "Sentence Structure",
          topics: [
            "Subject and Predicate",
            "Simple Sentences",
            "Compound Sentences",
          ],
        },
        {
          week: 3,
          title: "Articles and Determiners",
          topics: [
            "Definite and Indefinite Articles",
            "Demonstratives",
            "Quantifiers",
          ],
        },
        {
          week: 4,
          title: "Verb Tenses",
          topics: ["Present Tenses", "Past Tenses", "Future Tenses"],
        },
        {
          week: 5,
          title: "Modal Verbs",
          topics: [
            "Can, Could, May, Might",
            "Must, Should, Ought to",
            "Will, Would, Shall",
          ],
        },
        {
          week: 6,
          title: "Conditionals",
          topics: [
            "Zero and First Conditional",
            "Second Conditional",
            "Third Conditional",
          ],
        },
        {
          week: 7,
          title: "Passive Voice",
          topics: [
            "Active vs Passive",
            "Forming Passive Sentences",
            "When to Use Passive",
          ],
        },
        {
          week: 8,
          title: "Final Review and Practice",
          topics: [
            "Comprehensive Review",
            "Practice Tests",
            "Final Assessment",
          ],
        },
      ],
    },
    "business-english-communication": {
      id: "business-english-communication",
      title: "Business English Communication",
      description:
        "Develop professional English skills for the workplace, including business writing, presentations, and cross-cultural communication.",
      content: `
        <p>Master the art of professional English communication in today's global business environment. This course covers essential skills for effective workplace communication.</p>
        
        <h2>Course Overview</h2>
        <p>In today's interconnected world, strong business English skills are essential for career success. This comprehensive course will help you develop the communication skills needed to excel in professional settings.</p>
        
        <h2>Key Learning Outcomes</h2>
        <ul>
          <li>Write professional emails and business documents</li>
          <li>Deliver effective presentations</li>
          <li>Participate confidently in meetings</li>
          <li>Navigate cross-cultural communication</li>
          <li>Build professional relationships</li>
        </ul>
      `,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      price: 89.99,
      originalPrice: 129.99,
      duration: "10 weeks",
      level: "Intermediate",
      lessons: 32,
      students: 890,
      rating: 4.9,
      instructor: "Prof. Michael Chen",
      lastUpdated: "December 2024",
      features: [
        "32 professional video lessons",
        "Real-world business scenarios",
        "Presentation practice sessions",
        "Email writing templates",
        "Cultural communication guide",
        "Professional certificate",
      ],
      curriculum: [
        {
          week: 1,
          title: "Business Communication Fundamentals",
          topics: [
            "Professional Tone",
            "Clear and Concise Writing",
            "Active Listening",
          ],
        },
        {
          week: 2,
          title: "Email Communication",
          topics: [
            "Email Structure",
            "Professional Greetings",
            "Effective Closings",
          ],
        },
        {
          week: 3,
          title: "Business Writing",
          topics: [
            "Reports and Proposals",
            "Meeting Minutes",
            "Business Letters",
          ],
        },
        {
          week: 4,
          title: "Presentation Skills",
          topics: [
            "Presentation Structure",
            "Visual Aids",
            "Delivery Techniques",
          ],
        },
        {
          week: 5,
          title: "Meeting Participation",
          topics: [
            "Agenda Setting",
            "Active Participation",
            "Follow-up Actions",
          ],
        },
        {
          week: 6,
          title: "Cross-cultural Communication",
          topics: [
            "Cultural Awareness",
            "Communication Styles",
            "Building Relationships",
          ],
        },
        {
          week: 7,
          title: "Negotiation and Persuasion",
          topics: [
            "Negotiation Language",
            "Persuasive Techniques",
            "Conflict Resolution",
          ],
        },
        {
          week: 8,
          title: "Networking and Small Talk",
          topics: [
            "Professional Networking",
            "Conversation Starters",
            "Relationship Building",
          ],
        },
        {
          week: 9,
          title: "Crisis Communication",
          topics: [
            "Handling Difficult Situations",
            "Apologizing Professionally",
            "Damage Control",
          ],
        },
        {
          week: 10,
          title: "Final Project and Assessment",
          topics: [
            "Business Communication Portfolio",
            "Final Presentation",
            "Course Assessment",
          ],
        },
      ],
    },
  };

  const blogDetail = blogData[blogId] || blogData["english-grammar-fundamentals"]; // Fallback for structure

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blogs" className="text-violet-600 hover:text-violet-700">
            ← Back to Blogs
          </Link>
        </nav>

        {/* Article Header */}
        <article>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              <span>•</span>
              <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {blog.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-violet-600">
                    {blog.instructor.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{blog.instructor}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead">{blog.excerpt}</p>
            <p>{blog.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Section */}
          <div className="border-t border-b py-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Share this article:</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
