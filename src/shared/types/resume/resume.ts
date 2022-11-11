import { generateId } from '@/shared/helpers';

import {
  Contact,
  Experience,
  Profile,
  Skills,
} from './content';
import { ResumeLayout, ResumeTheme } from './style';

export type Resume = {
  id: string
  userId: string
  content: {
    fullName: string
    jobTitle: string
    profile: Profile
    skills: Skills
    experience?: Experience
    contact?: Contact
  },
  style: {
    theme: ResumeTheme
    layout: ResumeLayout
  }
}

export type ResumeContent = Resume['content'];
export type ResumeStyle = Resume['style'];

export const Resume = {
  create(userId: string, content: ResumeContent): Resume {
    return {
      id: generateId(),
      userId,
      content,
      style: {
        theme: 'default',
        layout: 'layout-a',
      },
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
  decode(data: unknown): Resume {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid resume data');
    }

    const { id, userId, content, style } = data as Resume;

    if (typeof id !== 'string') {
      throw new Error('Invalid resume id');
    }

    if (typeof userId !== 'string') {
      throw new Error('Invalid resume userId');
    }

    if (typeof content !== 'object' || content === null) {
      throw new Error('Invalid resume content');
    }

    const { fullName, jobTitle } = content;

    if (typeof fullName !== 'string') {
      throw new Error('Invalid resume fullName');
    }

    if (typeof jobTitle !== 'string') {
      throw new Error('Invalid resume jobTitle');
    }

    return {
      id,
      userId,
      content: {
        fullName,
        jobTitle,
        profile: Profile.decode(content.profile),
        skills: Skills.decode(content.skills),
      },
      style: {
        theme: ResumeTheme.decode(style.theme),
        layout: ResumeLayout.decode(style.layout),
      },
    };
  },
  encode(resume: Resume): Record<string, unknown> {
    return {
      id: resume.id,
      userId: resume.userId,
      content: resume.content,
      style: {
        theme: ResumeTheme.encode(resume.style.theme),
        layout: ResumeLayout.encode(resume.style.layout),
      },
    };
  },
};
