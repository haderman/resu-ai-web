import styled from 'styled-components';

const BaseLayout = styled.div`
  position: relative;

  // Page size for A4 pages - https://github.com/w3c/csswg-drafts/issues/328
  height: 297mm;
  width: 210mm;
  min-width: 210mm;

  background-color: ${(props) => props.theme.colors.primary.background};
  color: ${(props) => props.theme.colors.primary.text};

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  @media print {
    body * {
      visibility: hidden;
    }

    & * {
      visibility: visible;
    }

    & {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

export const LayoutB = styled(BaseLayout)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, min-content);
  grid-template-areas:
    'child1 child2 child2'
    'child3 child4 child4'
    'child6 child6 child6'
    'child5 child5 child5'
    ;

  & > div:nth-child(1) {
    grid-area: child1;
  }

  & > div:nth-child(2) {
    grid-area: child2;
  }

  & > div:nth-child(3) {
    grid-area: child3;
  }

  & > div:nth-child(4) {
    grid-area: child4;
  }

  & > div:nth-child(5) {
    grid-area: child5;
  }

  & > div:nth-child(6) {
    grid-area: child6;
  }
`;
