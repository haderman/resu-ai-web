import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectSelectedItem } from '@/state';
import { SectionType } from '@/shared/types';

import { sectionSchemaMap } from '../schema';
import { Adapter } from '../common';
import styles from './panel.module.scss';

export type PanelProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export function Panel(props: PanelProps) {
  const selectedItem = useSelector(selectSelectedItem);
  const schemaMap = React.useMemo(
    () => sectionSchemaMap[selectedItem as SectionType],
    [selectedItem]
  );

  return (
    <div {...props} className={styles.panel}>
      {schemaMap.fields.map((field) => {
        return <Adapter key={field.path} field={field} />;
      })}
    </div>
  );
}
