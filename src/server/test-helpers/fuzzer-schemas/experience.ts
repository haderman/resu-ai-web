import { FuzzerSchema, Fuzz } from '../fuzzer';
import { Experience } from '@/shared/types/resume';

const experienceEntrySchema: FuzzerSchema<Experience['entries'][0]> = {
  title: Fuzz.string(),
  company: Fuzz.string(),
  startDate: Fuzz.string(),
  endDate: Fuzz.string(),
  description: Fuzz.string(),
};

const experienceEntryFuzzer = Fuzz.Fuzzer(experienceEntrySchema);

const experienceSchema: FuzzerSchema<Experience> = {
  entries: Fuzz.array({
    type: experienceEntryFuzzer(),
  }),
};

export const experienceFuzzer = Fuzz.Fuzzer(experienceSchema);
