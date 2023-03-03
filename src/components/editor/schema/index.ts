import { SectionSchemaMap } from '@/shared/types';
import { profileSectionSchemaMap } from './profile-schema';
import { skillsSectionSchemaMap } from './skills-schema';
import { coverSectionSchemaMap } from './cover-schema';
import { contactSectionSchemaMap } from './contact-schema';
import { photoSectionSchemaMap } from './photo-schema';
import { experienceSectionSchemaMap } from './experience-schema';
import { projectsSectionSchemaMap } from './projects-schema';

export const sectionSchemaMap: SectionSchemaMap = {
  profile: profileSectionSchemaMap,
  skills: skillsSectionSchemaMap,
  cover: coverSectionSchemaMap,
  contact: contactSectionSchemaMap,
  photo: photoSectionSchemaMap,
  experience: experienceSectionSchemaMap,
  projects: projectsSectionSchemaMap,
};
