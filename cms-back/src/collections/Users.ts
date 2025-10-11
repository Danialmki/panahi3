import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'fullName',
  },
  auth: true,
  access: {
    create: () => true, // anyone can create
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
}
