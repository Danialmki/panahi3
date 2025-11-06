// API base URL configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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

// Mock data for fallback - Empty arrays to use only backend data
const mockCourses: Course[] = [];

const mockBlogPosts: BlogPost[] = [];

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
    const response = await fetch(
      `${API_BASE_URL}/courses?where%5Bstatus%5D%5Bequals%5D=published&depth=2`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if we have valid data
    if (!data.docs || !Array.isArray(data.docs)) {
      throw new Error("Invalid response from API");
    }

    // Transform Payload CMS data to match frontend Course interface
    const courses: Course[] = data.docs.map((course: any) => ({
      id:
        parseInt(course.id.slice(-6), 16) ||
        Math.floor((course.id.charCodeAt(0) * course.id.charCodeAt(1)) % 1000),
      title: course.title,
      description: course.summary,
      price: course.price,
      originalPrice: course.price * 1.5,
      image: course.thumbnail?.url
        ? course.thumbnail.url.startsWith("http")
          ? course.thumbnail.url
          : course.thumbnail.url.startsWith("/api/media/file/")
          ? `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${course.thumbnail.url.replace(
              "/api/media/file/",
              ""
            )}`
          : `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${course.thumbnail.url}`
        : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      duration: "8 weeks",
      level: "Beginner",
      lessons: 24,
      students:
        Math.floor((course.id.charCodeAt(0) + course.id.charCodeAt(1)) % 1000) +
        100,
      rating: 4.5 + (course.id.charCodeAt(2) % 5) / 10,
      blogId: course.slug,
      language: "English",
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
    console.warn(
      "Failed to fetch courses from backend, using mock data:",
      error
    );

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
    const response = await fetch(
      `${API_BASE_URL}/blogs?where%5Bpublished%5D%5Bequals%5D=true&depth=2`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if we have valid data
    if (!data.docs || !Array.isArray(data.docs)) {
      throw new Error("Invalid response from API");
    }

    // Transform Payload CMS data to match frontend BlogPost interface
    const blogs: BlogPost[] = data.docs.map((blog: any) => {
      // Extract text from Lexical editor content
      let contentText = "";
      if (blog.content?.root?.children) {
        contentText = blog.content.root.children
          .map((child: any) => {
            if (child.children) {
              return child.children
                .map((textNode: any) => textNode.text || "")
                .join("");
            }
            return "";
          })
          .join(" ");
      }

      return {
        id: blog.slug,
        title: blog.title,
        description:
          contentText.substring(0, 150) +
          (contentText.length > 150 ? "..." : ""),
        excerpt:
          contentText.substring(0, 100) +
          (contentText.length > 100 ? "..." : ""),
        image: blog.cover?.url
          ? blog.cover.url.startsWith("http")
            ? blog.cover.url
            : blog.cover.url.startsWith("/api/media/file/")
            ? `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${blog.cover.url.replace(
                "/api/media/file/",
                ""
              )}`
            : `https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev/${blog.cover.url}`
          : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
        price: 49.99,
        originalPrice: 99.99,
        duration: "8 weeks",
        level: "Beginner",
        lessons: 24,
        students:
          Math.floor((blog.id.charCodeAt(0) + blog.id.charCodeAt(1)) % 1000) +
          100,
        rating: 4.5 + (blog.id.charCodeAt(2) % 5) / 10,
        instructor: blog.author?.fullName || "Unknown Author",
        publishDate: blog.publishedAt || blog.createdAt,
        readTime: "5 min read",
        category: "General",
        tags: ["blog", "learning"],
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
