import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'store',
  title: 'Butiker & Platser',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (Namn på butiken/platsen)',
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
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Butiker', value: 'Butiker'},
          {title: 'Kaféer', value: 'Kaféer'},
          {title: 'Mat & Dryck', value: 'Mat & Dryck'},
          {title: 'Kultur och platser', value: 'Kultur och platser'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Adress',
      type: 'string',
    }),
    defineField({
      name: 'openHours',
      title: 'Öppettider (t.ex. Mån-Fre 10-18)',
      type: 'string',
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
      name: 'websiteUrl',
      title: 'Hemsida (URL)',
      type: 'url',
    }),
    defineField({
      name: 'locationMapUrl',
      title: 'Google Maps Länk',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Taggar (t.ex. Mode, Vintage, Fika)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
