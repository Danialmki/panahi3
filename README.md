# Panahi Academy - Full Stack Application

A modern full-stack application built with Next.js and Payload CMS for an online learning platform.

## Project Structure

```
panahi4/
├── cms-back/          # Payload CMS Backend (Port 3001)
├── danial/            # Next.js Frontend (Port 3000)
└── README.md
```

## Tech Stack

### Backend (cms-back)
- **Payload CMS** 3.56.0 - Headless CMS
- **Next.js** 15.4.4 - Framework
- **MongoDB Atlas** - Database
- **Cloudflare R2** - Media Storage (S3-compatible)
- **Sharp** - Image Processing

### Frontend (danial)
- **Next.js** 15.5.2 - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** 4.0 - Styling
- **Radix UI** - UI Components
- **Lucide React** - Icons

## Environment Variables

### Backend Environment (.env in cms-back/)

```env
# Payload CMS Configuration
PAYLOAD_SECRET=92de801c16752f7c5a133c9bb7f070f4dac99deaa60b8fe58281e67c82799714

# Database Configuration - MongoDB Atlas
DATABASE_URI=mongodb+srv://dbuser:MOAUtPBacg6P3xry@panahicluster.jeepmav.mongodb.net/?retryWrites=true&w=majority&appName=panahiCluster

# Next.js Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
PORT=3001

# Development Configuration
NODE_ENV=development

# Cloudflare R2 Storage Configuration
R2_ACCESS_KEY_ID=0ab02a90bce02c1480c60915f7c94039
R2_SECRET_ACCESS_KEY=6f77bbb3a29154b390c8cdc284373480cb89fec02be29670b611f21cbbeb183a
R2_BUCKET_NAME=panahi
R2_ACCOUNT_ID=33cbcf611d814aada8a113182c7e9cf7
R2_PUBLIC_URL=https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev

# S3 Storage Configuration (Cloudflare R2)
S3_ENDPOINT=https://33cbcf611d814aada8a113182c7e9cf7.r2.cloudflarestorage.com
S3_BUCKET=panahi
S3_ACCESS_KEY_ID=0ab02a90bce02c1480c60915f7c94039
S3_SECRET=6f77bbb3a29154b390c8cdc284373480cb89fec02be29670b611f21cbbeb183a

# Uploadthing Configuration
UPLOADTHING_TOKEN=EfKQNr_mQph0aRH_S6Lt3MnESJKEdkn3XVFUAhYh
```

### Frontend Environment (.env.local in danial/)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Cloudflare R2 Public URL
NEXT_PUBLIC_R2_URL=https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev
```

## Getting Started

### Prerequisites
- Node.js 20.9.0 or higher
- pnpm 9.x or 10.x
- MongoDB Atlas account (or local MongoDB)
- Cloudflare R2 account (for media storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Danialmki/panahi3.git
cd panahi3
```

2. **Install Backend Dependencies**
```bash
cd cms-back
pnpm install
```

3. **Install Frontend Dependencies**
```bash
cd ../danial
pnpm install
```

4. **Set up Environment Variables**
- Create `.env` file in `cms-back/` directory
- Copy the backend environment variables from above
- Create `.env.local` file in `danial/` directory (if needed)

### Running the Application

#### Development Mode

**Terminal 1 - Backend (Payload CMS):**
```bash
cd cms-back
PORT=3001 pnpm dev
```
Backend will run on: http://localhost:3001
Admin Panel: http://localhost:3001/admin

**Terminal 2 - Frontend (Next.js):**
```bash
cd danial
PORT=3000 pnpm dev
```
Frontend will run on: http://localhost:3000

#### Production Build

**Backend:**
```bash
cd cms-back
pnpm build
pnpm start
```

**Frontend:**
```bash
cd danial
pnpm build
pnpm start
```

## Features

### Backend (Payload CMS)
- ✅ User authentication and authorization
- ✅ Role-based access control (Admin, Author)
- ✅ Media management with Cloudflare R2 storage
- ✅ Blog post management
- ✅ Course management
- ✅ Rich text editor (Lexical)
- ✅ Image resizing and optimization
- ✅ RESTful API
- ✅ GraphQL API

### Frontend
- ✅ Modern, responsive UI
- ✅ Dark/Light theme toggle
- ✅ Course browsing and filtering
- ✅ Blog post listing and reading
- ✅ User dashboard
- ✅ Authentication (Login/Signup)
- ✅ Level assessment
- ✅ Profile management

## API Endpoints

### Courses
- `GET /api/courses` - List all published courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course (Auth required)
- `PATCH /api/courses/:id` - Update course (Auth required)
- `DELETE /api/courses/:id` - Delete course (Auth required)

### Blogs
- `GET /api/blogs` - List all published blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog (Auth required)
- `PATCH /api/blogs/:id` - Update blog (Auth required)
- `DELETE /api/blogs/:id` - Delete blog (Auth required)

### Media
- `GET /api/media` - List all media files
- `POST /api/media` - Upload media file (Auth required)
- `GET /api/media/file/:filename` - Get media file
- `DELETE /api/media/:id` - Delete media file (Auth required)

### Users
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user
- `POST /api/users` - Create new user

## Collections Schema

### Courses
- `title` (text, required)
- `slug` (text, required, unique)
- `summary` (textarea, required)
- `price` (number, required)
- `status` (select: draft/published)
- `author` (relationship to users)
- `thumbnail` (upload, media)
- `lessons` (number, default: 24)
- `duration` (text, default: "8 weeks")
- `students` (number, default: 100)
- `rating` (number, 0-5, default: 4.5)

### Blogs
- `title` (text, required)
- `slug` (text, required, unique)
- `content` (richText, required)
- `cover` (upload, media)
- `published` (checkbox, default: false)
- `publishedAt` (date, auto-generated)
- `author` (relationship to users)
- `lessons` (number, default: 24)
- `duration` (text, default: "8 weeks")
- `students` (number, default: 100)
- `rating` (number, 0-5, default: 4.5)

### Media
- `alt` (text, required)
- `caption` (text)
- Auto-generated sizes: thumbnail (400x300), card (768x1024), tablet (1024xauto)

### Users
- `fullName` (text, required)
- `email` (email, required, unique)
- `password` (password, required)
- `role` (select: admin/author)

## Cloudflare R2 Storage

The application uses Cloudflare R2 (S3-compatible) for media storage:

- **Bucket Name**: panahi
- **Public URL**: https://pub-33cbcf611d814aada8a113182c7e9cf7.r2.dev
- **Storage Path**: `media/` prefix for all uploaded files
- **Image Sizes**: Automatic generation of thumbnail, card, and tablet sizes

## Database

MongoDB Atlas is used for data storage:
- **Cluster**: panahiCluster
- **Database**: Auto-created by Payload CMS
- **Collections**: users, media, blogs, courses, payload-preferences, payload-migrations

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Build the application: `pnpm build`
3. Start the server: `pnpm start`
4. Ensure MongoDB Atlas allows connections from your hosting IP
5. Configure Cloudflare R2 CORS for your domain

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to your backend URL
2. Build the application: `pnpm build`
3. Deploy to Vercel, Netlify, or your preferred platform

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Issues
- Check if your IP is whitelisted in MongoDB Atlas
- Verify DATABASE_URI is correct
- Ensure network access is configured

### Cloudflare R2 Upload Issues
- Verify S3_ACCESS_KEY_ID and S3_SECRET are correct
- Check R2 bucket permissions
- Ensure CORS is configured for your domain

### Image Not Displaying
- Verify images are uploaded to R2 bucket
- Check Next.js `next.config.ts` allows R2 domain
- Ensure `depth=2` is included in API calls for related media

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@panahiacademy.com or open an issue in the repository.

## Acknowledgments

- [Payload CMS](https://payloadcms.com/) - Headless CMS
- [Next.js](https://nextjs.org/) - React Framework
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Object Storage
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - UI Components

