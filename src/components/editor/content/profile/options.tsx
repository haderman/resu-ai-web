import { WithTheme } from '../../themes';
import {
  InputTitleContainer,
  InputDescriptionContainer,
  InputCardBackgroundContainer,
} from './controls';

export function ProfileOptions() {
  return (
    <>
      <InputTitleContainer />
      <InputDescriptionContainer />
      <WithTheme>
        <InputCardBackgroundContainer />
      </WithTheme>
    </>
  );
};
