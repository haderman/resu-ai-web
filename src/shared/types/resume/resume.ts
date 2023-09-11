import { generateId, Path } from '@/shared/helpers';
import { ResumeTheme } from '@/themes';

import {
  BasicInfo,
  Contact,
  Experience,
  Profile,
  Skills,
} from './content';
import { ResumeLayout } from './layout';
import { ResumeSections } from './sections';

export type Resume = {
  id: string
  userId: string
  content: {
    basicInfo: BasicInfo
    profile: Profile
    skills: Skills
    experience: Experience
    contact: Contact
  },
  style: {
    theme: ResumeTheme
  },
  layout: ResumeLayout
  sections: ResumeSections
}

export type ResumeContent = Resume['content'];

export type ResumeStyle = Resume['style'];

export type ResumeContentPath = Path<Resume['content']>;

export const Resume = {
  decode(data: unknown): Resume {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid resume data');
    }

    const { id, userId, content, style, sections, layout } = data as Resume;

    if (typeof id !== 'string') {
      throw new Error('Invalid resume id');
    }

    if (typeof userId !== 'string') {
      throw new Error('Invalid resume user id');
    }

    if (typeof content !== 'object' || content === null) {
      throw new Error('Invalid resume content');
    }

    if (typeof style !== 'object' || style === null) {
      throw new Error('Invalid resume style');
    }

    return {
      id,
      userId,
      content: {
        basicInfo: BasicInfo.decode(content?.basicInfo),
        profile: Profile.decode(content?.profile),
        skills: Skills.decode(content?.skills),
        contact: Contact.decode(content?.contact),
        experience: Experience.decode(content?.experience),
      },
      style: {
        theme: ResumeTheme.decode(style?.theme),
      },
      layout: ResumeLayout.decode(layout),
      sections: ResumeSections.decode(sections),
    };
  },
  encode(resume: Resume): Record<string, unknown> {
    return {
      id: resume.id,
      userId: resume.userId,
      content: resume.content,
      style: {
        theme: ResumeTheme.encode(resume.style.theme),
      },
      layout: ResumeLayout.encode(resume.layout),
      sections: ResumeSections.encode(resume.sections),
    };
  },
  create(userId: string, content: ResumeContent): Resume {
    return {
      id: generateId(),
      userId,
      content,
      style: {
        theme: 'dark-space',
      },
      layout: ResumeLayout.DEFAULT_LAYOUT,
      sections: ResumeSections.DEFAULT_LIST,
    };
  },
  update(resume: Resume, values: Pick<Resume, 'content' | 'style'> ): Resume {
    return {
      ...resume,
      content: {
        ...resume.content,
        ...values.content,
      },
      style: {
        ...resume.style,
        ...values.style,
      },
    };
  },
  createDefault(): Resume {
    return {
      id: generateId(),
      userId: '',
      content: DEFAULT_RESUME_CONTENT,
      style: DEFAULT_RESUME_STYLE,
      layout: ResumeLayout.DEFAULT_LAYOUT,
      sections: ResumeSections.DEFAULT_LIST,
    };
  },
};

const DEFAULT_RESUME_CONTENT: ResumeContent = {
  basicInfo: {
    fullName: 'Maximus Steelgrave',
    jobTitle: 'Galactic Software Engineer',
  },
  profile: {
    title: {
      text: 'Summary',
      align: 'left',
      color: 'white',
      size: 'large',
    },
    description: {
      text: 'Ex software Jedi with a deep understanding of the Force and mastery over various coding languages like Java, Python, and C++. Skilled in utilizing the power of the Dark and Light Sides of coding to deliver high-quality and efficient software solutions. Adept at navigating through the galaxies of requirements gathering, design, coding, testing, and deployment. Collaborative team player with excellent communication skills, known for utilizing the Force to bridge the gap between technical and non-technical stakeholders. Seeking an exciting role in software development that allows me to harness the Force to bring forth innovative solutions to a universe in need.',
      color: 'white',
      size: 'medium',
    },
    cardStyle: {
      background: 'almost-black',
    },
  },
  skills: {
    title: {
      text: 'Skills',
      align: 'left',
      color: 'white',
      size: 'large',
    },
    cardStyle: {
      background: 'almost-black',
    },
    items: [
      { title: 'Java', yearsOfExperience: 5 },
      { title: 'Python', yearsOfExperience: 3 },
      { title: 'C++', yearsOfExperience: 4 },
      { title: 'HTML', yearsOfExperience: 6 },
      { title: 'CSS', yearsOfExperience: 6 },
      { title: 'JavaScript', yearsOfExperience: 4 },
      { title: 'Lightsaber techniques', yearsOfExperience: 10 },
      { title: 'The Force', yearsOfExperience: 1 },
    ],
    itemStyle: {
      background: 'almost-black',
      color: 'pink',
      size: 'small',
    },
  },
  contact: {
    cardStyle: {
      background: 'almost-black',
    },
    data: {
      email: 'maximus.steelgrave@example.com',
      github: 'maximus-st',
      website: 'https://maximussteelgrave.com',
    }
  },
};

const DEFAULT_RESUME_STYLE: ResumeStyle = {
  theme: 'dark-space',
};
