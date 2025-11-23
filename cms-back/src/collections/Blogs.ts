import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lessons',
      type: 'number',
      defaultValue: 24,
      admin: {
        position: 'sidebar',
        description: 'Number of lessons in this blog/course',
      },
    },
    {
      name: 'duration',
      type: 'text',
      defaultValue: '8 weeks',
      admin: {
        position: 'sidebar',
        description: 'Duration of the blog/course (e.g., "8 weeks", "3 months")',
      },
    },
    {
      name: 'students',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Number of students enrolled',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 4.5,
      admin: {
        position: 'sidebar',
        description: 'Rating out of 5 stars',
        step: 0.1,
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Set publishedAt to now if publishing for the first time
          if (data?.published && !data?.publishedAt) {
            data.publishedAt = new Date().toISOString()
          }
          // Clear publishedAt if unpublishing
          if (!data?.published && data?.publishedAt) {
            data.publishedAt = null
          }
        }
        return data
      },
    ],
  },
  access: {
    read: () => true, // Allow everyone to read all blogs (can be restricted later)
    create: ({ req: { user } }) => {
      // Any authenticated user can create
      return !!user
    },
    update: ({ req: { user } }) => {
      // Admin can update any
      if (user?.role === 'admin') {
        return true
      }

      // Author can update their own
      if (user?.role === 'author') {
        return {
          author: {
            equals: user.id,
          },
        }
      }

      return false
    },
    delete: ({ req: { user } }) => {
      // Admin can delete any
      if (user?.role === 'admin') {
        return true
      }

      // Author can delete their own
      if (user?.role === 'author') {
        return {
          author: {
            equals: user.id,
          },
        }
      }

      return false
    },
  },
}
