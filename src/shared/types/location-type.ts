const values = ['on-site', 'remote', 'hybrid'] as const;

export type LocationType = typeof values[number];

export const LocationType = {
  values,
  decode(data: unknown): LocationType {
    if (typeof data !== 'string') {
      throw new Error('Invalid location type');
    }

    if (!['remote', 'on-site', 'hybrid'].includes(data)) {
      throw new Error('Invalid location type');
    }

    return data as LocationType;
  },
  encode(data: LocationType): string {
    return data;
  },
  isLocationType(data: unknown): data is LocationType {
    try {
      LocationType.decode(data);
      return true;
    } catch {
      return false;
    }
  },
  toFriendlyString(data: LocationType): string {
    switch (data) {
      case 'remote': return 'Remote';
      case 'on-site': return 'On-site';
      case 'hybrid': return 'Hybrid';
    }
  },
};
