import { FuzzerSchema, Fuzz } from '../fuzzer';
import { Skills, SkillItem } from '@/shared/types/resume';

const titleFuzzerSchema: FuzzerSchema<Skills['title']> = {
  text: Fuzz.string(),
  align: Fuzz.alignment(),
  color: Fuzz.color(),
  size: Fuzz.size(),
};

const itemStyleFuzzerSchema: FuzzerSchema<Skills['itemStyle']> = {
  background: Fuzz.color(),
  color: Fuzz.color(),
  size: Fuzz.size(),
};

const cardStyleFuzzerSchema: FuzzerSchema<Skills['cardStyle']> = {
  background: Fuzz.color(),
};

var skillFuzzerSchema: FuzzerSchema<SkillItem> = {
  title: Fuzz.string(),
  yearsOfExperience: Fuzz.int({
    min: 0,
    max: 30,
  }),
};

const titleFuzzer = Fuzz.Fuzzer(titleFuzzerSchema);
const itemStyleFuzzer = Fuzz.Fuzzer(itemStyleFuzzerSchema);
const cardStyleFuzzer = Fuzz.Fuzzer(cardStyleFuzzerSchema);
const skillFuzzer = Fuzz.Fuzzer(skillFuzzerSchema);

const skillsFuzzerSchema: FuzzerSchema<Skills> = {
  title: titleFuzzer(),
  itemStyle: itemStyleFuzzer(),
  cardStyle: cardStyleFuzzer(),
  items: Fuzz.array({
    type: skillFuzzer(),
  }),
};

export const skillsFuzzer = Fuzz.Fuzzer(skillsFuzzerSchema);
