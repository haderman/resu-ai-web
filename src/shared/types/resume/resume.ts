import { generateId } from '@/shared/helpers';

import { Contact } from './contact';
import { Experience } from './experience';
import { Profile } from './profile';
import { Skills } from './skills';

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
  }
}

export type ResumeContent = Resume['content'];

export const Resume = {
  create(userId: string, content: ResumeContent): Resume {
    return {
      id: generateId(),
      userId,
      content,
    };
  },
  update(resume: Resume, content: ResumeContent): Resume {
    return {
      ...resume,
      content: {
        ...resume.content,
        ...content,
      },
    };
  },
  decode(data: unknown): Resume {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid resume data');
    }

    const { id, userId, content } = data as Resume;

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
    };
  },
  encode(resume: Resume): Record<string, unknown> {
    return {
      id: resume.id,
      userId: resume.userId,
      content: resume.content,
    };
  },
};
