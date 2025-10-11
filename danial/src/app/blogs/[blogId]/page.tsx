"use client";

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

  // Mock blog data - in a real app, this would come from an API
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

  const blog = blogData[blogId];

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Course Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The course you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link href="/courses">
              <Button className="bg-violet-600 hover:bg-violet-700 cursor-pointer">
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/courses" className="hover:text-foreground">
            Courses
          </Link>
          <span>/</span>
          <span className="text-foreground">{blog.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-foreground">
                    ${blog.price}
                  </span>
                  {blog.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${blog.originalPrice}
                    </span>
                  )}
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{blog.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <p className="font-medium">{blog.level}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lessons:</span>
                    <p className="font-medium">{blog.lessons}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Students:</span>
                    <p className="font-medium">
                      {blog.students.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{blog.rating}</span>
                  <span className="text-muted-foreground">
                    ({blog.students.toLocaleString()} students)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 cursor-pointer">
                    Enroll Now - ${blog.price}
                  </Button>
                  <Button variant="outline" className="w-full cursor-pointer">
                    Add to Wishlist
                  </Button>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium mb-2">Whats included:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {blog.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {blog.lessons} lessons • {blog.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blog.curriculum.map((week, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">
                        Week {week.week}: {week.title}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {week.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-violet-500">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructor Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-violet-600">
                      {blog.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h4 className="font-medium">{blog.instructor}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {blog.lastUpdated}
                  </p>
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
