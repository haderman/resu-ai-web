import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Skills } from '@/shared/types';

import { selectResumeStatus, selectResume, useResumeUpdaters } from '../slice';

const selectSkills = createSelector(
  selectResume,
  (resume) => resume?.content.skills ?? Skills.create(),
);

const selectTitle = createSelector(
  selectSkills,
  (skills) => skills.title,
);

const selectCardBackground = createSelector(
  selectSkills,
  (skills) => skills.cardStyle.background,
);

const selectItems = createSelector(
  selectSkills,
  (skills) => skills.items,
);

const selectItemStyle = createSelector(
  selectSkills,
  (skills) => skills.itemStyle,
);

export function useUpdater() {
  const skills = useSelector(selectSkills);
  const [resumeUpdater] = useResumeUpdaters();

  function updateSkills(newSkills: Partial<Skills>) {
    // resumeUpdater.updateContent({
    //   skills: Skills.update(skills, newSkills),
    // });
  }

  function updateTitle(title: Partial<Skills['title']>) {
    updateSkills(Skills.updateTitle(skills, title));
  }

  function updateCardStyle(style: Partial<Skills['cardStyle']>) {
    updateSkills(Skills.updateCardStyle(skills, style));
  }

  function updateItemStyle(style: Partial<Skills['itemStyle']>) {
    updateSkills(Skills.updateItemStyle(skills, style));
  }

  function updateItems(items: Skills['items']) {
    updateSkills(Skills.updateItems(skills, items));
  }

  const updater = {
    updateTitle,
    updateItems,
    updateCardStyle,
    updateItemStyle,
  };

  return [updater] as const;
}

export const selectors = {
  selectResumeStatus,
  selectSkills,
  selectTitle,
  selectCardBackground,
  selectItems,
  selectItemStyle,
};
