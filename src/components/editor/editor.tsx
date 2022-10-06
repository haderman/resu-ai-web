import { Layout } from './layout';
import { Preview } from './preview';
import { CustomizationPanel } from './customization-panel';

export function Editor() {
  return (
    <Layout
      customizationPanel={<CustomizationPanel />}
      preview={<Preview />}
    />
  );
}
