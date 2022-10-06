import { Color } from '../../types';

export type SkillsProps = {
  background: Color;
  color: Color
  data: SkillsData;
}

export type SkillsData = Array<{ name: string, years: number }>
