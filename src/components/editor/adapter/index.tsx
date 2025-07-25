import { InputTextAdapter } from './input-text-adapter';
import { InputAlignAdapter } from './input-align-adapter';
import { InputColorAdapter } from './input-color-adapter';
import { InputSizeAdapter } from './input-size-adapter';
import { InputTextEditorAdapter } from './input-text-editor-adapter';
import { AdapterProps } from './types';
import { InputSkillItemsAdapter } from './input-skill-items-adapter';
import { InputExperienceAdapter } from './input-experience-adapter';

export function Adapter(props: AdapterProps) {
  if (props.field.type === 'text') {
    return <InputTextAdapter {...props.field} />;
  }

  if (props.field.type === 'align') {
    return <InputAlignAdapter {...props.field} />;
  }

  if (props.field.type === 'color') {
    return <InputColorAdapter {...props.field} />;
  }

  if (props.field.type === 'size') {
    return <InputSizeAdapter {...props.field} />;
  }

  if (props.field.type === 'rich-text') {
    return <InputTextEditorAdapter {...props.field} />;
  }

  if (props.field.type === 'skill-items') {
    return <InputSkillItemsAdapter {...props.field} />;
  }

  if (props.field.type === 'experience-entries') {
    return <InputExperienceAdapter {...props.field} />;
  }

  return (
    <div className="flex flex-col">NULL</div>
  );
}
