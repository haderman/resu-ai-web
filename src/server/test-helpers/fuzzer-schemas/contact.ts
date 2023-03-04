import { FuzzerSchema, Fuzz } from '../fuzzer';
import { Contact } from '@/shared/types/resume';

const cardStyleFuzzerSchema: FuzzerSchema<Contact['cardStyle']> = {
  background: Fuzz.color(),
};

const dataFuzzerSchema: FuzzerSchema<Contact['data']> = {
  email: Fuzz.string(),
  phone: Fuzz.string(),
  website: Fuzz.string(),
  discord: Fuzz.string(),
  github: Fuzz.string(),
  linkedin: Fuzz.string(),
  twitter: Fuzz.string(),
  facebook: Fuzz.string(),
  instagram: Fuzz.string(),
  youtube: Fuzz.string(),
  pinterest: Fuzz.string(),
  tiktok: Fuzz.string(),
  snapchat: Fuzz.string(),
  whatsapp: Fuzz.string(),
  telegram: Fuzz.string(),
  skype: Fuzz.string(),
  twitch: Fuzz.string(),
  vimeo: Fuzz.string(),
  reddit: Fuzz.string(),
  quora: Fuzz.string(),
  medium: Fuzz.string(),
  stackoverflow: Fuzz.string(),
  dribbble: Fuzz.string(),
};

const dataFuzzer = Fuzz.Fuzzer(dataFuzzerSchema);
const cardStyleFuzzer = Fuzz.Fuzzer(cardStyleFuzzerSchema);

const contactFuzzerSchema: FuzzerSchema<Contact> = {
  cardStyle: cardStyleFuzzer(),
  data: dataFuzzer(),
};

export const contactFuzzer = Fuzz.Fuzzer(contactFuzzerSchema);
