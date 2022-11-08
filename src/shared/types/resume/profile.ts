import { Size, Alignment } from '../units';
import { Color } from '../color';

export type Profile = {
  title: {
    text: string
    align: Alignment
    color: Color
    size: Size
  }
  description: {
    text: string
    color: Color
    size: Size
  },
  cardStyle: {
    background: Color
  },
};

type Title = Profile['title'];
type Description = Profile['description'];
type CardStyle = Profile['cardStyle'];

export const Profile = {
  create(title: string = 'Profile', description: string = ''): Profile {
    return {
      title: {
        text: title,
        align: 'center',
        color: 'primary',
        size: 'default',
      },
      description: {
        text: description,
        color: 'primary',
        size: 'default',
      },
      cardStyle: {
        background: 'secondary',
      },
    };
  },
  update(profile: Profile, newProfile: Partial<Profile>): Profile {
    return {
      ...profile,
      ...newProfile,
    };
  },
  updateTitle(profile: Profile, newTitle: Partial<Title>): Profile {
    return {
      ...profile,
      title: {
        ...profile.title,
        ...newTitle,
      },
    };
  },
  updateDescription(profile: Profile, newDescription: Partial<Description>): Profile {
    return {
      ...profile,
      description: {
        ...profile.description,
        ...newDescription,
      },
    };
  },
  updateCardStyle(profile: Profile, newCardStyle: Partial<CardStyle>): Profile {
    return {
      ...profile,
      cardStyle: {
        ...profile.cardStyle,
        ...newCardStyle,
      },
    };
  },
  decode(data: unknown): Profile {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid profile data');
    }

    const { title, description, cardStyle } = data as Profile;

    return {
      title: decodeTitle(title),
      description: decodeDescription(description),
      cardStyle: decodeCardStyle(cardStyle),
    };
  },
  encode(profile: Profile): unknown {
    return {
      title: encodeTitle(profile.title),
      description: encodeDescription(profile.description),
      cardStyle: encodeCardStyle(profile.cardStyle),
    };
  }
};

/**
 * DECODERS
 */
function decodeTitle(data: unknown): Title {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid profile title data');
  }

  const { text, align, color, size } = data as Title;

  return {
    text: text || 'Profile',
    align: Alignment.decode(align),
    color: Color.decode(color),
    size: Size.decode(size),
  };
}

function decodeDescription(data: unknown): Description {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid profile description data');
  }

  const { text, color, size } = data as Description;

  return {
    text: text || '',
    color: Color.decode(color),
    size: Size.decode(size),
  };
}

function decodeCardStyle(data: unknown): CardStyle {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid profile card style data');
  }

  const { background } = data as CardStyle;

  return {
    background: Color.decode(background),
  };
}

/**
 * ENCODERS
 */
export function encodeTitle(title: Title): Record<keyof Title, unknown> {
  return {
    text: title.text,
    align: Alignment.encode(title.align),
    color: Color.encode(title.color),
    size: Size.encode(title.size),
  };
}

export function encodeDescription(description: Description): Record<keyof Description, unknown> {
  return {
    text: description.text,
    color: Color.encode(description.color),
    size: Size.encode(description.size),
  };
}

export function encodeCardStyle(cardStyle: CardStyle): Record<keyof CardStyle, unknown> {
  return {
    background: Color.encode(cardStyle.background),
  };
}


