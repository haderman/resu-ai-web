import { FuzzerSchema, Fuzz } from '../fuzzer';
import { Experience } from '@/shared/types/resume';

const titleFuzzerSchema: FuzzerSchema<Experience['title']> = {
  text: Fuzz.string(),
  align: Fuzz.alignment(),
  color: Fuzz.color(),
  size: Fuzz.size(),
};

const experienceEntrySchema: FuzzerSchema<Experience['entries'][0]> = {
  title: Fuzz.string(),
  company: Fuzz.string(),
  startDate: Fuzz.string(),
  endDate: Fuzz.string(),
  description: Fuzz.string(),
  location: Fuzz.string(),
  locationType: Fuzz.locationType(),
  skills: Fuzz.array({
    type: Fuzz.string(),
  }),
};

const styleFuzzerSchema: FuzzerSchema<Experience['style']> = {
  background: Fuzz.color(),
};

const entryStyleFuzzerSchema: FuzzerSchema<Experience['entryStyle']> = {
  background: Fuzz.color(),
};

const titleFuzzer = Fuzz.Fuzzer(titleFuzzerSchema);
const experienceEntryFuzzer = Fuzz.Fuzzer(experienceEntrySchema);
const styleFuzzer = Fuzz.Fuzzer(styleFuzzerSchema);
const entryStyleFuzzer = Fuzz.Fuzzer(entryStyleFuzzerSchema);

const experienceSchema: FuzzerSchema<Experience> = {
  title: titleFuzzer(),
  style: styleFuzzer(),
  entryStyle: entryStyleFuzzer(),
  entries: Fuzz.array({
    type: experienceEntryFuzzer(),
  }),
};

export const experienceFuzzer = Fuzz.Fuzzer(experienceSchema);
