import { FuzzerSchema, Fuzz } from '../fuzzer';
import { Profile } from '@/shared/types/resume';

const titleFuzzerSchema: FuzzerSchema<Profile['title']> = {
  text: Fuzz.string(),
  align: Fuzz.alignment(),
  color: Fuzz.color(),
  size: Fuzz.size(),
};

const descriptionFuzzerSchema: FuzzerSchema<Profile['description']> = {
  text: Fuzz.string(),
  color: Fuzz.color(),
  size: Fuzz.size(),
};

const cardStyleFuzzerSchema: FuzzerSchema<Profile['cardStyle']> = {
  background: Fuzz.color(),
};

const titleFuzzer = Fuzz.Fuzzer(titleFuzzerSchema);
const descriptionFuzzer = Fuzz.Fuzzer(descriptionFuzzerSchema);
const cardStyleFuzzer = Fuzz.Fuzzer(cardStyleFuzzerSchema);

const profileFuzzerSchema: FuzzerSchema<Profile> = {
  title: titleFuzzer(),
  description: descriptionFuzzer(),
  cardStyle: cardStyleFuzzer(),
};

export const profileFuzzer = Fuzz.Fuzzer(profileFuzzerSchema);
