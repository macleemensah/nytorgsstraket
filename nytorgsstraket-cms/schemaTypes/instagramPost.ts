import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Inlägg (Aktuellt)',
  type: 'document',
  fields: [
    defineField({
      name: 'postId',
      title: 'Instagram Post ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'store',
      title: 'Butik/Hyresgäst',
      type: 'reference',
      to: [{type: 'store'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Bildtext',
      type: 'text',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Bild-URL (Instagram)',
      type: 'url',
    }),
    defineField({
      name: 'localImage',
      title: 'Nedladdad bild (Sanity)',
      type: 'image',
    }),
    defineField({
      name: 'postUrl',
      title: 'Länk till inlägget',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publiceringsdatum',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
