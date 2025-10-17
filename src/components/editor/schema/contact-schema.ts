import { SectionSchemaMap } from '@/shared/types';

export const contactSectionSchemaMap: SectionSchemaMap['contact'] = {
  type: 'contact',
  fields: [
    {
      type: 'text',
      path: 'basicInfo.fullName',
      label: 'Full Name',
      name: 'full-name',
    },
    {
      type: 'text',
      path: 'basicInfo.jobTitle',
      label: 'Job Title',
      name: 'job-title',
    },
    {
      type: 'text',
      path: 'contact.data.email',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'text',
      path: 'contact.data.phone',
      label: 'Phone',
      name: 'phone',
    },
    {
      type: 'text',
      path: 'contact.data.website',
      label: 'Website',
      name: 'website',
    },
    {
      type: 'text',
      path: 'contact.data.linkedin',
      label: 'LinkedIn',
      name: 'linkedin',
    },
    {
      type: 'text',
      path: 'contact.data.github',
      label: 'GitHub',
      name: 'github',
    },
    {
      type: 'text',
      path: 'contact.data.twitter',
      label: 'Twitter',
      name: 'twitter',
    },
    {
      type: 'text',
      path: 'contact.data.facebook',
      label: 'Facebook',
      name: 'facebook',
    },
    {
      type: 'text',
      path: 'contact.data.instagram',
      label: 'Instagram',
      name: 'instagram',
    },
    {
      type: 'text',
      path: 'contact.data.youtube',
      label: 'YouTube',
      name: 'youtube',
    },
    {
      type: 'text',
      path: 'contact.data.pinterest',
      label: 'Pinterest',
      name: 'pinterest',
    },
    {
      type: 'text',
      path: 'contact.data.tiktok',
      label: 'TikTok',
      name: 'tiktok',
    },
    {
      type: 'text',
      path: 'contact.data.snapchat',
      label: 'Snapchat',
      name: 'snapchat',
    },
    {
      type: 'text',
      path: 'contact.data.whatsapp',
      label: 'WhatsApp',
      name: 'whatsapp',
    },
    {
      type: 'text',
      path: 'contact.data.telegram',
      label: 'Telegram',
      name: 'telegram',
    },
    {
      type: 'text',
      path: 'contact.data.discord',
      label: 'Discord',
      name: 'discord',
    },
    {
      type: 'text',
      path: 'contact.data.skype',
      label: 'Skype',
      name: 'skype',
    },
    {
      type: 'text',
      path: 'contact.data.twitch',
      label: 'Twitch',
      name: 'twitch',
    },
    {
      type: 'text',
      path: 'contact.data.vimeo',
      label: 'Vimeo',
      name: 'vimeo',
    },
    {
      type: 'text',
      path: 'contact.data.reddit',
      label: 'Reddit',
      name: 'reddit',
    },
    {
      type: 'text',
      path: 'contact.data.quora',
      label: 'Quora',
      name: 'quora',
    },
    {
      type: 'text',
      path: 'contact.data.medium',
      label: 'Medium',
      name: 'medium',
    },
    {
      type: 'text',
      path: 'contact.data.stackoverflow',
      label: 'Stack Overflow',
      name: 'stackoverflow',
    },
    {
      type: 'text',
      path: 'contact.data.dribbble',
      label: 'Dribbble',
      name: 'dribbble',
    },
    {
      type: 'color',
      path: 'contact.cardStyle.background',
      label: 'Background Color',
      name: 'background-color',
    }
  ],
};
