import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'fullName',
  },
  auth: true,
  access: {
    // Allow public signup but they won't have admin access
    create: () => true,
    // Restrict who can access the admin panel
    admin: ({ req: { user } }) => {
      // Only admin and author roles can access the admin panel
      return user?.role === 'admin' || user?.role === 'author'
    },
        read: ({ req: { user } }) => {
          if (user?.role === 'admin') {
            return true
          }
          return {
            id: {
              equals: user?.id,
            },
          }
        },
    update: ({ req: { user } }) => {
      // Admin can update any, users can update themselves (except role)
      if (user?.role === 'admin') {
        return true
      }
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      // Only admin can delete
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'Student',
          value: 'student',
        },
      ],
      defaultValue: 'student',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          // Only admin can update role
          return user?.role === 'admin'
        },
      },
    },
  ],
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        // Block students from accessing admin panel after successful login
        if (user?.role === 'student') {
          const referer = req.headers.get('referer') || ''
          const origin = req.headers.get('origin') || ''
          
          // If the request is from admin panel, prevent access
          if (referer.includes('/admin') || origin.includes(':3001')) {
            throw new Error('Students do not have access to the admin panel. Please use the frontend at http://localhost:3000')
          }
        }
        
        return user
      },
    ],
  },
}

