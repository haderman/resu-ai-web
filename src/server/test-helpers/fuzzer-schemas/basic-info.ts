import { FuzzerSchema, Fuzz } from '../fuzzer';
import { BasicInfo } from '@/shared/types/resume';

const basicInfoSchema: FuzzerSchema<BasicInfo> = {
  fullName: Fuzz.string(),
  jobTitle: Fuzz.string(),
};

export const basicInfoFuzzer = Fuzz.Fuzzer(basicInfoSchema);
