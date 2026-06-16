import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'Aktuellt (Nyheter)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Rubrik',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publiceringsdatum',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Huvudbild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kort Ingress (Sammanfattning)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Innehåll (Brödtext)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Taggar (t.ex. Intervju, Nyöppnat)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
