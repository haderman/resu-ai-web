import styled from 'styled-components';

export type LayoutProps = {
  customizationPanel: React.ReactNode;
  preview: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const {
    customizationPanel: CustomizationPanel,
    preview: Preview,
  } = props;

  return (
    <StyledLayout>
      {CustomizationPanel}
      {Preview}
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;

  & > *:first-child {
    overflow: auto;
    min-height: 100%;
  }

  & > *:last-child {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 100%;
  }
`;
