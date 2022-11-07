export type Skills = {
  entries: Skill[]
}

export type Skill = {
  title: string
  yearsOfExperience: number
}

export const Skill = {
  isSkill(data: unknown): data is Skill {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const { title, yearsOfExperience } = data as Skill;

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
  create(entries: Skill[] = []): Skills {
    return {
      entries,
    };
  },
  update(skills: Skills, newSkills: Partial<Skills>): Skills {
    return {
      ...skills,
      ...newSkills,
    };
  },
  decode(data: unknown): Skills {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid skills data');
    }

    const { entries } = data as Skills;

    if (!Array.isArray(entries)) {
      throw new Error('Invalid skills entries');
    }

    if (!entries.every(Skill.isSkill)) {
      console.log(entries[0]);
      throw new Error('Invalid skills entry');
    }

    return {
      entries,
    };
  },
  encode(skills: Skills): unknown {
    return {
      entries: skills.entries,
    };
  },
};
