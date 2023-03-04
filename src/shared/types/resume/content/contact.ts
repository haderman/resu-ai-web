import { Color } from '../../color';

export type ContactFieldPath =
  | `data.${keyof Contact['data']}`
  | `cardStyle.${keyof Contact['cardStyle']}`;

export type Contact = {
  cardStyle: {
    background: Color
  }
  data: {
    email?: string
    phone?: string
    website?: string
    linkedin?: string
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
    youtube?: string
    pinterest?: string
    tiktok?: string
    snapchat?: string
    whatsapp?: string
    telegram?: string
    discord?: string
    skype?: string
    twitch?: string
    vimeo?: string
    reddit?: string
    quora?: string
    medium?: string
    stackoverflow?: string
    dribbble?: string
  }
}

export const Contact = {
  decode(data: unknown): Contact {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid contact data');
    }

    const { cardStyle, data: contactData } = data as Contact;

    if (typeof cardStyle !== 'object' || cardStyle === null) {
      throw new Error('Invalid contact card style');
    }

    if (typeof contactData !== 'object' || contactData === null) {
      throw new Error('Invalid contact data');
    }

    return {
      cardStyle: {
        background: Color.decode(cardStyle.background),
      },
      data: contactData,
    };
  },
  encode(contact: Contact): Record<string, unknown> {
    return {
      cardStyle: {
        background: contact.cardStyle.background,
      },
      data: contact.data,
    };
  },
  create(): Contact {
    return {
      cardStyle: {
        background: 'blue',
      },
      data: {},
    };
  },
};
