export type Profile = {
  title: string
  description: string
}

export const Profile = {
  create(title: string = 'Profile', description: string = ''): Profile {
    return {
      title,
      description,
    };
  },
  update(profile: Profile, newProfile: Partial<Profile>): Profile {
    return {
      ...profile,
      ...newProfile,
    };
  },
  decode(data: unknown): Profile {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid profile data');
    }

    const { title, description } = data as Profile;

    if (typeof title !== 'string') {
      throw new Error('Invalid profile title');
    }

    if (typeof description !== 'string') {
      throw new Error('Invalid profile description');
    }

    return {
      title,
      description,
    };
  },
  encode(profile: Profile): unknown {
    return {
      title: profile.title,
      description: profile.description,
    };
  }
};
