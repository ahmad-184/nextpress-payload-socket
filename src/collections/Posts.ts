import { SOCKET_EVENTS } from '@/app-config'
import { getIOInstance } from '@/lib/socket'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: () => true,
    update: () => true,
    delete: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        const socket = getIOInstance()
        if (operation === 'create') socket?.emit(SOCKET_EVENTS.POST_CREATED, doc)
        if (operation === 'update') socket?.emit(SOCKET_EVENTS.POST_UPDATED, doc)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const socket = getIOInstance()
        socket?.emit(SOCKET_EVENTS.POST_DELETED, doc)
        return doc
      },
    ],
  },
}
