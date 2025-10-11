import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Enable image resizing and optimization
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true, // public read access
    create: ({ req: { user } }) => {
      // Admin and authors can upload
      return user?.role === 'admin' || user?.role === 'author'
    },
    update: ({ req: { user } }) => {
      // Admin and authors can update
      return user?.role === 'admin' || user?.role === 'author'
    },
    delete: ({ req: { user } }) => {
      // Admin and authors can delete
      return user?.role === 'admin' || user?.role === 'author'
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
  ],
}
