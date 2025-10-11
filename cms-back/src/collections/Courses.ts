import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
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
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
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
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'lessons',
      type: 'number',
      defaultValue: 24,
      admin: {
        position: 'sidebar',
        description: 'Number of lessons in this course',
      },
    },
    {
      name: 'duration',
      type: 'text',
      defaultValue: '8 weeks',
      admin: {
        position: 'sidebar',
        description: 'Duration of the course (e.g., "8 weeks", "3 months")',
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
  },
      access: {
        read: ({ req: { user } }) => {
          if (user?.role === 'admin') return true
          if (user?.role === 'author') {
            return {
              or: [
                { status: { equals: 'published' } },
                { author: { equals: user.id } },
              ],
            }
          }
          return { status: { equals: 'published' } }
        },
    create: ({ req: { user } }) => {
      // Admin and authors can create
      return user?.role === 'admin' || user?.role === 'author'
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
