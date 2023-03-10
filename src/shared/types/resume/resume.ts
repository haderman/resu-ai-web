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
};
