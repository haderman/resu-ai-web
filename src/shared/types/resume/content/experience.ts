import { Color } from '../../color';
import { Alignment, Size } from '../../units';

export type Experience = {
  title: {
    text: string
    align: Alignment
    color: Color
    size: Size
  }
  entries: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
}

export const Experience = {
  decode(data: unknown): Experience {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid experience data');
    }

    const { entries, title } = data as Experience;

    if (!Array.isArray(entries)) {
      throw new Error('Invalid experience entries');
    }

    // if (title !== 'string') {
    //   throw new Error('Invalid experience title');
    // }

    return {
      title,
      entries: entries.map((entry) => {
        if (typeof entry !== 'object' || entry === null) {
          throw new Error('Invalid experience entry');
        }

        const { title, company, startDate, endDate, description } = entry;

        if (typeof title !== 'string') {
          throw new Error('Invalid experience entry title');
        }

        if (typeof company !== 'string') {
          throw new Error('Invalid experience entry company');
        }

        if (typeof startDate !== 'string') {
          throw new Error('Invalid experience entry start date');
        }

        if (typeof endDate !== 'string') {
          throw new Error('Invalid experience entry end date');
        }

        if (typeof description !== 'string') {
          throw new Error('Invalid experience entry description');
        }

        return {
          title,
          company,
          startDate,
          endDate,
          description,
        };
      }),
    };
  },
  encode(data: Experience): unknown {
    return {
      entries: data.entries.map((entry) => ({
        title: entry.title,
        company: entry.company,
        startDate: entry.startDate,
        endDate: entry.endDate,
        description: entry.description,
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
      entries: [],
    };
  },
};
