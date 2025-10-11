import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Courses } from './collections/Courses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blogs, Courses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
    'http://localhost:3000', // Frontend URL
    'http://localhost:3001', // Backend URL
  ],
  db: process.env.DATABASE_URI?.startsWith('postgresql://') 
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      })
    : mongooseAdapter({
        url: process.env.DATABASE_URI || '',
      }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // Cloudflare R2 Storage (S3-compatible)
    s3Storage({
      // This baseUrl makes Payload return absolute, publicly accessible URLs from R2
      baseUrl: process.env.R2_PUBLIC_URL || '',
      // Optional prefix to organize files within the bucket
      prefix: 'media/',
      collections: {
        media: true, // Apply storage to 'media' collection
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' as the region
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
