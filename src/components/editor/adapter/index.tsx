import { Field } from '@/shared/types';

import { InputTextAdapter } from './input-text-adapter';
import { InputAlignAdapter } from './input-align-adapter';
import { InputColorAdapter } from './input-color-adapter';
import { InputSizeAdapter } from './input-size-adapter';
import { InputTextEditorAdapter } from './input-text-editor-adapter';

export type AdapterProps = {
  field: Field
}

export function Adapter(props: AdapterProps) {
  if (props.field.type === 'text') {
    return <InputTextAdapter path={props.field.path} />;
  }

  if (props.field.type === 'align') {
    return <InputAlignAdapter path={props.field.path} />;
  }

  if (props.field.type === 'color') {
    return <InputColorAdapter path={props.field.path} />;
  }

  if (props.field.type === 'size') {
    return <InputSizeAdapter path={props.field.path} />;
  }

  if (props.field.type === 'rich-text') {
    return <InputTextEditorAdapter path={props.field.path} />;
  }

  return (
    <div className="flex flex-col">NULL</div>
  );
}
