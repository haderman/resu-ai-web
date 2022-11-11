import { Color } from '../../color';
import { Size, Alignment } from '../../units';

export type Skills = {
  title: {
    text: string
    align: Alignment
    color: Color
    size: Size
  }
  items: SkillItem[]
  itemStyle: {
    background: Color
    color: Color
    size: Size
  }
  cardStyle: {
    background: Color
  },
};

export type SkillItem = {
  title: string
  yearsOfExperience: number
};

type Title = Skills['title'];
type ItemStyle = Skills['itemStyle'];
type CardStyle = Skills['cardStyle'];

export const Skill = {
  isSkill(data: unknown): data is SkillItem {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const { title, yearsOfExperience } = data as SkillItem;

    if (typeof title !== 'string') {
      return false;
    }

    if (typeof yearsOfExperience !== 'number') {
      return false;
    }

    return true;
  },
};

export const Skills = {
  create(): Skills {
    return {
      items: [],
      title: {
        text: 'Skills',
        align: 'left',
        color: 'secondary',
        size: 'medium',
      },
      itemStyle: {
        background: 'primary',
        color: 'secondary',
        size: 'medium',
      },
      cardStyle: {
        background: 'secondary',
      },
    };
  },
  update(skills: Skills, newSkills: Partial<Skills>): Skills {
    return { ...skills, ...newSkills };
  },
  updateTitle(skills: Skills, newTitle: Partial<Title>): Skills {
    return Skills.update(skills, {
      title: { ...skills.title, ...newTitle },
    });
  },
  updateItemStyle(skill: Skills, newEntryStyle: Partial<ItemStyle>): Skills {
    return Skills.update(skill, {
      itemStyle: { ...skill.itemStyle, ...newEntryStyle },
    });
  },
  updateCardStyle(skill: Skills, newCardStyle: Partial<CardStyle>): Skills {
    return Skills.update(skill, {
      cardStyle: { ...skill.cardStyle, ...newCardStyle },
    });
  },
  addSkill(skills: Skills, skill: SkillItem): Skills {
    return Skills.update(skills, {
      items: [...skills.items, skill],
    });
  },
  // This might be deleted later
  updateItems(skills: Skills, newItems: SkillItem[]): Skills {
    return Skills.update(skills, {
      items: newItems,
    });
  },
  decode(data: unknown): Skills {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid skills data');
    }

    const { items, title, itemStyle, cardStyle } = data as Skills;

    if (!Array.isArray(items)) {
      throw new Error('Invalid skills entries');
    }

    if (!items.every(Skill.isSkill)) {
      throw new Error('Invalid skills entry');
    }

    return {
      items,
      title: decodeTitle(title),
      itemStyle: decodeItemStyle(itemStyle),
      cardStyle: decodeCardStyle(cardStyle),
    };
  },
  encode(skills: Skills): Record<keyof Skills, unknown> {
    return {
      items: skills.items,
      title: encodeTitle(skills.title),
      itemStyle: encodeItemStyle(skills.itemStyle),
      cardStyle: encodeCardStyle(skills.cardStyle),
    };
  },
};

/**
 * DECODERS
 */
function decodeTitle(data: unknown): Title {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid title data');
  }

  const { text, align, color, size } = data as Title;

  if (typeof text !== 'string') {
    throw new Error('Invalid title text');
  }

  return {
    text,
    align: Alignment.decode(align),
    color: Color.decode(color),
    size: Size.decode(size),
  };
}

function decodeItemStyle(data: unknown): ItemStyle {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid entry style data');
  }

  const { background, color, size } = data as ItemStyle;

  return {
    background: Color.decode(background),
    color: Color.decode(color),
    size: Size.decode(size),
  };
}

function decodeCardStyle(data: unknown): CardStyle {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid card style data');
  }

  const { background } = data as CardStyle;

  return {
    background: Color.decode(background),
  };
}

/**
 * ENCODERS
 */
function encodeTitle(title: Title): Record<keyof Title, unknown> {
  return {
    text: title.text,
    align: Alignment.encode(title.align),
    color: Color.encode(title.color),
    size: Size.encode(title.size),
  };
}

function encodeItemStyle(itemStyle: ItemStyle): Record<keyof ItemStyle, unknown> {
  return {
    background: itemStyle.background,
    color: itemStyle.color,
    size: itemStyle.size,
  };
}

function encodeCardStyle(cardStyle: CardStyle): Record<keyof CardStyle, unknown> {
  return {
    background: cardStyle.background,
  };
}

