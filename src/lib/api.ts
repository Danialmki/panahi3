// API base URL configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Type definitions
export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  blogId: string;
  language: string;
}

export interface BlogPost {
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

// Mock data for fallback
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Complete English Grammar Masterclass",
    description:
      "Master all aspects of English grammar from basic to advanced levels. Perfect for students, professionals, and anyone looking to improve their English skills.",
    price: 49.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    blogId: "grammar-masterclass",
    language: "English",
  },
  {
    id: 2,
    title: "Business English Communication",
    description:
      "Learn professional English communication skills for the workplace. Includes email writing, presentations, meetings, and networking.",
    price: 79.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    duration: "6 weeks",
    level: "Intermediate",
    lessons: 18,
    students: 890,
    rating: 4.9,
    blogId: "business-english",
    language: "English",
  },
  {
    id: 3,
    title: "Advanced English Writing & Composition",
    description:
      "Develop advanced writing skills for academic and professional purposes. Learn essay writing, creative writing, and technical writing.",
    price: 89.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
    duration: "10 weeks",
    level: "Advanced",
    lessons: 30,
    students: 567,
    rating: 4.7,
    blogId: "advanced-writing",
    language: "English",
  },
  {
    id: 4,
    title: "English Pronunciation & Accent Training",
    description:
      "Perfect your English pronunciation and reduce your accent with phonetics training, speech exercises, and confidence building techniques.",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    duration: "6 weeks",
    level: "Beginner",
    lessons: 18,
    students: 2100,
    rating: 4.6,
    blogId: "pronunciation-training",
    language: "English",
  },
  {
    id: 5,
    title: "IELTS Preparation Complete Guide",
    description:
      "Comprehensive preparation for the IELTS exam covering all four sections: Reading, Writing, Listening, and Speaking with practice tests.",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    duration: "16 weeks",
    level: "Advanced",
    lessons: 40,
    students: 750,
    rating: 4.9,
    blogId: "ielts-preparation",
    language: "English",
  },
  {
    id: 6,
    title: "Conversational English Mastery",
    description:
      "Improve your speaking skills with real-world conversations, idioms, slang, and cultural context for everyday communication.",
    price: 39.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    lessons: 20,
    students: 1800,
    rating: 4.5,
    blogId: "conversational-english",
    language: "English",
  },
  {
    id: 7,
    title: "English Literature & Critical Analysis",
    description:
      "Explore classic and contemporary English literature while developing critical thinking and analytical writing skills.",
    price: 79.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    duration: "14 weeks",
    level: "Advanced",
    lessons: 36,
    students: 420,
    rating: 4.8,
    blogId: "english-literature",
    language: "English",
  },
  {
    id: 8,
    title: "English for Academic Purposes",
    description:
      "Prepare for academic success with research skills, academic writing, presentation techniques, and study strategies.",
    price: 99.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1523240794102-9ebd0b167f3f?w=400&h=250&fit=crop",
    duration: "12 weeks",
    level: "Intermediate",
    lessons: 30,
    students: 680,
    rating: 4.7,
    blogId: "academic-english",
    language: "English",
  },
  {
    id: 9,
    title: "TOEFL Test Preparation",
    description:
      "Master the TOEFL exam with comprehensive strategies, practice tests, and expert guidance for all four test sections.",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    duration: "14 weeks",
    level: "Advanced",
    lessons: 35,
    students: 520,
    rating: 4.8,
    blogId: "toefl-preparation",
    language: "English",
  },
  {
    id: 10,
    title: "English Vocabulary Building",
    description:
      "Expand your English vocabulary with systematic learning methods, word roots, context clues, and practical usage examples.",
    price: 34.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    duration: "6 weeks",
    level: "Beginner",
    lessons: 15,
    students: 3200,
    rating: 4.4,
    blogId: "vocabulary-building",
    language: "English",
  },
  {
    id: 11,
    title: "English Listening & Comprehension",
    description:
      "Enhance your listening skills with various accents, speeds, and contexts including news, conversations, and academic lectures.",
    price: 44.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    duration: "7 weeks",
    level: "Intermediate",
    lessons: 21,
    students: 1450,
    rating: 4.6,
    blogId: "listening-comprehension",
    language: "English",
  },
  // Russian Courses
  {
    id: 12,
    title: "Russian Grammar Fundamentals",
    description:
      "Learn the basics of Russian grammar including cases, verb conjugations, and sentence structure for beginners.",
    price: 54.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    duration: "10 weeks",
    level: "Beginner",
    lessons: 28,
    students: 890,
    rating: 4.7,
    blogId: "russian-grammar",
    language: "Russian",
  },
  {
    id: 13,
    title: "Russian Conversation Practice",
    description:
      "Improve your Russian speaking skills with practical conversations, pronunciation, and cultural context.",
    price: 44.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    lessons: 22,
    students: 650,
    rating: 4.6,
    blogId: "russian-conversation",
    language: "Russian",
  },
  {
    id: 14,
    title: "Russian Literature & Culture",
    description:
      "Explore Russian literature, history, and culture while improving your language skills through authentic texts.",
    price: 69.99,
    originalPrice: 109.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    duration: "12 weeks",
    level: "Advanced",
    lessons: 32,
    students: 320,
    rating: 4.8,
    blogId: "russian-literature",
    language: "Russian",
  },
  // Spanish Courses
  {
    id: 15,
    title: "Spanish Grammar Mastery",
    description:
      "Master Spanish grammar from basic to advanced levels including verb tenses, subjunctive mood, and complex structures.",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    duration: "9 weeks",
    level: "Beginner",
    lessons: 26,
    students: 1800,
    rating: 4.8,
    blogId: "spanish-grammar",
    language: "Spanish",
  },
  {
    id: 16,
    title: "Spanish for Business",
    description:
      "Learn professional Spanish for business communication, presentations, and workplace interactions.",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    duration: "7 weeks",
    level: "Intermediate",
    lessons: 20,
    students: 950,
    rating: 4.7,
    blogId: "spanish-business",
    language: "Spanish",
  },
  {
    id: 17,
    title: "Spanish Conversation & Culture",
    description:
      "Practice Spanish conversation while learning about Hispanic cultures, traditions, and regional variations.",
    price: 39.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    duration: "6 weeks",
    level: "Intermediate",
    lessons: 18,
    students: 1200,
    rating: 4.5,
    blogId: "spanish-conversation",
    language: "Spanish",
  },
  {
    id: 18,
    title: "DELE Exam Preparation",
    description:
      "Comprehensive preparation for the DELE Spanish proficiency exam with practice tests and expert strategies.",
    price: 119.99,
    originalPrice: 169.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    duration: "14 weeks",
    level: "Advanced",
    lessons: 38,
    students: 480,
    rating: 4.9,
    blogId: "dele-preparation",
    language: "Spanish",
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "grammar-masterclass",
    title: "Complete English Grammar Masterclass",
    description:
      "Master all aspects of English grammar from basic to advanced levels. Perfect for students, professionals, and anyone looking to improve their English skills.",
    excerpt:
      "Learn essential grammar rules, sentence structure, and common mistakes to avoid in this comprehensive guide.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    price: 49.99,
    originalPrice: 99.99,
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    instructor: "Sarah Johnson",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    category: "Grammar",
    tags: ["grammar", "beginner", "english", "learning"],
  },
  {
    id: "business-english",
    title: "Business English Communication",
    description:
      "Learn professional English communication skills for the workplace. Includes email writing, presentations, meetings, and networking.",
    excerpt:
      "Essential business English skills for professional success in today's global workplace.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    price: 79.99,
    originalPrice: 149.99,
    duration: "6 weeks",
    level: "Intermediate",
    lessons: 18,
    students: 890,
    rating: 4.9,
    instructor: "Michael Chen",
    publishDate: "2024-01-10",
    readTime: "7 min read",
    category: "Business",
    tags: ["business", "communication", "professional", "workplace"],
  },
  {
    id: "advanced-writing",
    title: "Advanced English Writing & Composition",
    description:
      "Develop advanced writing skills for academic and professional purposes. Learn essay writing, creative writing, and technical writing.",
    excerpt:
      "Take your writing skills to the next level with advanced techniques and strategies.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
    price: 89.99,
    originalPrice: 179.99,
    duration: "10 weeks",
    level: "Advanced",
    lessons: 30,
    students: 567,
    rating: 4.7,
    instructor: "Dr. Emily Rodriguez",
    publishDate: "2024-01-05",
    readTime: "8 min read",
    category: "Writing",
    tags: ["writing", "advanced", "composition", "academic"],
  },
];

// Helper function to make API requests with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API request failed for ${endpoint}, using mock data:`, error);
    throw error; // Re-throw to trigger fallback
  }
}

// API functions
export async function fetchCoursesByLevel(
  level: string = "all",
  language: string = "all"
): Promise<Course[]> {
  try {
    // Fetch from Payload CMS backend with depth to include related media
    const response = await fetch(`${API_BASE_URL}/courses?where[status][equals]=published&depth=2`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Payload CMS data to match frontend Course interface
    const courses: Course[] = data.docs.map((course: any) => ({
      id: parseInt(course.id.slice(-6), 16) || Math.floor(course.id.charCodeAt(0) * course.id.charCodeAt(1) % 1000), // Generate deterministic numeric ID
      title: course.title,
      description: course.summary,
      price: course.price,
      originalPrice: course.price * 1.5, // Add some original price for demo
      image: course.thumbnail?.url ? 
        (course.thumbnail.url.startsWith('http') ? course.thumbnail.url : 
         course.thumbnail.url.startsWith('/api/media/file/') ? 
           `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${course.thumbnail.url.replace('/api/media/file/', '')}` : 
           `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${course.thumbnail.url}`) 
        : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      duration: "8 weeks", // Default duration
      level: "Beginner", // Default level - you might want to add this field to your Course collection
      lessons: 24, // Default lessons - you might want to add this field
      students: Math.floor((course.id.charCodeAt(0) + course.id.charCodeAt(1)) % 1000) + 100, // Deterministic student count
      rating: 4.5 + ((course.id.charCodeAt(2) % 5) / 10), // Deterministic rating between 4.5-5.0
      blogId: course.slug,
      language: "English", // Default language - you might want to add this field
    }));

    // Apply filters
    let filteredCourses = courses;

    if (level !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }

    if (language !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.language.toLowerCase() === language.toLowerCase()
      );
    }

    return filteredCourses;
  } catch (error) {
    console.warn("Failed to fetch courses from backend, using mock data:", error);
    
    // Fallback to mock data
    let filteredCourses = mockCourses;

    if (level !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }

    if (language !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.language.toLowerCase() === language.toLowerCase()
      );
    }

    return filteredCourses;
  }
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  try {
    const courses = await apiRequest<Course[]>(`/courses/${id}`);
    return courses[0] || null;
  } catch (error) {
    // Fallback to mock data
    const course = mockCourses.find((c) => c.id.toString() === id);
    return course || null;
  }
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    // Fetch from Payload CMS backend with depth to include related media
    const response = await fetch(`${API_BASE_URL}/blogs?where%5Bpublished%5D%5Bequals%5D=true&depth=2`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Payload CMS data to match frontend BlogPost interface
    const blogs: BlogPost[] = data.docs.map((blog: any) => {
      // Extract text from Lexical editor content
      let contentText = '';
      if (blog.content?.root?.children) {
        contentText = blog.content.root.children
          .map((child: any) => {
            if (child.children) {
              return child.children.map((textNode: any) => textNode.text || '').join('');
            }
            return '';
          })
          .join(' ');
      }
      
      return {
        id: blog.slug,
        title: blog.title,
        description: contentText.substring(0, 150) + (contentText.length > 150 ? '...' : ''),
        excerpt: contentText.substring(0, 100) + (contentText.length > 100 ? '...' : ''),
        image: blog.cover?.url ? 
          (blog.cover.url.startsWith('http') ? blog.cover.url : 
           blog.cover.url.startsWith('/api/media/file/') ? 
             `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${blog.cover.url.replace('/api/media/file/', '')}` : 
             `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${blog.cover.url}`) 
          : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      price: 49.99, // Default price
      originalPrice: 99.99, // Default original price
      duration: "8 weeks", // Default duration
      level: "Beginner", // Default level
      lessons: 24, // Default lessons
      students: Math.floor((blog.id.charCodeAt(0) + blog.id.charCodeAt(1)) % 1000) + 100, // Deterministic student count
      rating: 4.5 + ((blog.id.charCodeAt(2) % 5) / 10), // Deterministic rating
      instructor: blog.author?.fullName || "Unknown Author",
      publishDate: blog.publishedAt || blog.createdAt,
      readTime: "5 min read", // Default read time
      category: "General", // Default category
      tags: ["blog", "learning"], // Default tags
      };
    });

    // Apply category filter if specified
    if (category) {
      return blogs.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    return blogs;
  } catch (error) {
    console.warn("Failed to fetch blogs from backend, using mock data:", error);
    
    // Fallback to mock data
    if (category) {
      return mockBlogPosts.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase()
      );
    }
    return mockBlogPosts;
  }
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const blogs = await apiRequest<BlogPost[]>(`/blogs/${id}`);
    return blogs[0] || null;
  } catch (error) {
    // Fallback to mock data
    const blog = mockBlogPosts.find((b) => b.id === id);
    return blog || null;
  }
}

// Utility function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
