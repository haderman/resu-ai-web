export type BasicInfo = {
  fullName: string
  jobTitle: string
};

export type BasicInfoFieldPath = 'fullName' | 'jobTitle';

export const BasicInfo = {
  decode(data: unknown): BasicInfo {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid basic info data');
    }

    const { fullName, jobTitle } = data as BasicInfo;

    if (typeof fullName !== 'string') {
      throw new Error('Invalid basic info full name');
    }

    if (typeof jobTitle !== 'string') {
      throw new Error('Invalid basic info job title');
    }

    return {
      fullName,
      jobTitle,
    };
  },
  encode(basicInfo: BasicInfo): Record<string, unknown> {
    return {
      fullName: basicInfo.fullName,
      jobTitle: basicInfo.jobTitle,
    };
  },
  create(): BasicInfo {
    return {
      fullName: '',
      jobTitle: '',
    };
  },
};
