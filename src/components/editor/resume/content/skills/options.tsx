import { WithTheme } from '@/components/editor/themes';
import {
  InputCardBackgroundContainer,
  InputChipsContainer,
  InputItemColorContainer,
} from './controls';

export function SkillsOptions() {
  return (
    <>
      <InputChipsContainer />
      <WithTheme>
        <InputCardBackgroundContainer />
        <InputItemColorContainer />
      </WithTheme>
    </>
  );
};
