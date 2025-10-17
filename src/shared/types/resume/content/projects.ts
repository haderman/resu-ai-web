import { Color } from '../../color';
import { Alignment, Size } from '../../units';

export type Projects = {
  title: {
    text: string
    align: Alignment
    color: Color
    size: Size
  }
  items: ProjectItem[]
  itemStyle: {
    background: Color
    color: Color
    size: Size
  }
  skillsStyle: {
    background: Color
    color: Color
    size: Size
  }
  cardStyle: {
    background: Color
  }
}

export type ProjectItem = {
  name: string
  description: string
  technologies: string[]
  repository?: string
  website?: string
}

type Title = Projects['title'];
type ItemStyle = Projects['itemStyle'];
type SkillsStyle = Projects['skillsStyle'];
type CardStyle = Projects['cardStyle'];

export const Project = {
  isProject(data: unknown): data is ProjectItem {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const { name, description, technologies } = data as ProjectItem;

    if (typeof name !== 'string') {
      return false;
    }

    if (typeof description !== 'string') {
      return false;
    }

    if (!Array.isArray(technologies)) {
      return false;
    }

    return true;
  },
};

export const Projects = {
  create(): Projects {
    return {
      title: {
        text: 'Side Projects',
        align: 'left',
        color: 'secondary',
        size: 'medium',
      },
      items: [],
      itemStyle: {
        background: 'secondary',
        color: 'primary',
        size: 'medium',
      },
      skillsStyle: {
        background: 'pink',
        color: 'white',
        size: 'small',
      },
      cardStyle: {
        background: 'primary',
      },
    };
  },
  update(projects: Projects, newProjects: Partial<Projects>): Projects {
    return { ...projects, ...newProjects };
  },
  updateTitle(projects: Projects, newTitle: Partial<Title>): Projects {
    return Projects.update(projects, {
      title: { ...projects.title, ...newTitle },
    });
  },
  updateItemStyle(projects: Projects, newItemStyle: Partial<ItemStyle>): Projects {
    return Projects.update(projects, {
      itemStyle: { ...projects.itemStyle, ...newItemStyle },
    });
  },
  updateSkillsStyle(projects: Projects, newSkillsStyle: Partial<SkillsStyle>): Projects {
    return Projects.update(projects, {
      skillsStyle: { ...projects.skillsStyle, ...newSkillsStyle },
    });
  },
  updateCardStyle(projects: Projects, newCardStyle: Partial<CardStyle>): Projects {
    return Projects.update(projects, {
      cardStyle: { ...projects.cardStyle, ...newCardStyle },
    });
  },
  addProject(projects: Projects, project: ProjectItem): Projects {
    return Projects.update(projects, {
      items: [...projects.items, project],
    });
  },
  updateItems(projects: Projects, newItems: ProjectItem[]): Projects {
    return Projects.update(projects, {
      items: newItems,
    });
  },
  decode(data: unknown): Projects {
    // If projects data doesn't exist (e.g., in old resumes), return default
    if (typeof data !== 'object' || data === null || data === undefined) {
      return Projects.create();
    }

    const { title, items, itemStyle, skillsStyle, cardStyle } = data as Projects;

    // Provide defaults if any fields are missing
    if (!Array.isArray(items)) {
      return Projects.create();
    }

    if (!items.every(Project.isProject)) {
      return Projects.create();
    }

    try {
      return {
        title: title ? decodeTitle(title) : Projects.create().title,
        items,
        itemStyle: itemStyle ? decodeItemStyle(itemStyle) : Projects.create().itemStyle,
        skillsStyle: skillsStyle ? decodeSkillsStyle(skillsStyle) : Projects.create().skillsStyle,
        cardStyle: cardStyle ? decodeCardStyle(cardStyle) : Projects.create().cardStyle,
      };
    } catch (error) {
      // If any decoding fails, return default
      return Projects.create();
    }
  },
  encode(projects: Projects): Record<keyof Projects, unknown> {
    return {
      title: encodeTitle(projects.title),
      items: projects.items,
      itemStyle: encodeItemStyle(projects.itemStyle),
      skillsStyle: encodeSkillsStyle(projects.skillsStyle),
      cardStyle: encodeCardStyle(projects.cardStyle),
    };
  },
};

/**
 * DECODERS
 */
function decodeTitle(data: unknown): Title {
  if (typeof data !== 'object' || data === null) {
    return Projects.create().title;
  }

  const { text, align, color, size } = data as Title;

  if (typeof text !== 'string') {
    return Projects.create().title;
  }

  try {
    return {
      text,
      align: Alignment.decode(align),
      color: Color.decode(color),
      size: Size.decode(size),
    };
  } catch (error) {
    return Projects.create().title;
  }
}

function decodeItemStyle(data: unknown): ItemStyle {
  if (typeof data !== 'object' || data === null) {
    return Projects.create().itemStyle;
  }

  const { background, color, size } = data as ItemStyle;

  try {
    return {
      background: Color.decode(background),
      color: Color.decode(color),
      size: Size.decode(size),
    };
  } catch (error) {
    return Projects.create().itemStyle;
  }
}

function decodeSkillsStyle(data: unknown): SkillsStyle {
  if (typeof data !== 'object' || data === null) {
    return Projects.create().skillsStyle;
  }

  const { background, color, size } = data as SkillsStyle;

  try {
    return {
      background: Color.decode(background),
      color: Color.decode(color),
      size: Size.decode(size),
    };
  } catch (error) {
    return Projects.create().skillsStyle;
  }
}

function decodeCardStyle(data: unknown): CardStyle {
  if (typeof data !== 'object' || data === null) {
    return Projects.create().cardStyle;
  }

  const { background } = data as CardStyle;

  try {
    return {
      background: Color.decode(background),
    };
  } catch (error) {
    return Projects.create().cardStyle;
  }
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

function encodeSkillsStyle(skillsStyle: SkillsStyle): Record<keyof SkillsStyle, unknown> {
  return {
    background: skillsStyle.background,
    color: skillsStyle.color,
    size: skillsStyle.size,
  };
}

function encodeCardStyle(cardStyle: CardStyle): Record<keyof CardStyle, unknown> {
  return {
    background: cardStyle.background,
  };
}