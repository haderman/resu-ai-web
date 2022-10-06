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

  & > * {
    overflow: auto;
    min-height: 100%;
  }
`;
