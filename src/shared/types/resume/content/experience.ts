import { Color } from '../../color';
import { LocationType } from '../../location-type';
import { Alignment, Size } from '../../units';

export type Experience = {
  title: {
    text: string
    align: Alignment
    color: Color
    size: Size
  }
  style: {
    background: Color
  }
  entryStyle: {
    background: Color
  }
  entries: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    achievements: string[]
    location: string
    locationType: LocationType
    skills: string[]
  }>
}

export type ExperienceEntry = Experience['entries'][number];

export const Experience = {
  decode(data: unknown): Experience {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid experience data');
    }

    const { title, style, entryStyle, entries } = data as Experience;

    return {
      title: {
        text: title.text || 'Experience',
        align: Alignment.decode(title.align),
        color: Color.decode(title.color),
        size: Size.decode(title.size),
      },
      style: {
        background: Color.decode(style?.background),
      },
      entryStyle: {
        background: Color.decode(entryStyle?.background),
      },
      entries: entries.map((entry) => ({
        title: entry.title || '',
        company: entry.company || '',
        startDate: entry.startDate || '',
        endDate: entry.endDate || '',
        achievements: entry.achievements || [],
        location: entry.location || '',
        locationType: entry.locationType || 'on-site',
        skills: entry.skills || [],
      })),
    };
  },
  encode(data: Experience): unknown {
    return {
      entries: data.entries.map((entry) => ({
        title: entry.title,
        company: entry.company,
        startDate: entry.startDate,
        endDate: entry.endDate,
        achievements: entry.achievements,
        location: entry.location,
        locationType: entry.locationType,
        skills: entry.skills,
      })),
    };
  },
  create(): Experience {
    return {
      title: {
        text: 'Experience',
        align: 'left',
        color: 'secondary',
        size: 'medium',
      },
      style: {
        background: 'white',
      },
      entryStyle: {
        background: 'white',
      },
      entries: [],
    };
  },
};
