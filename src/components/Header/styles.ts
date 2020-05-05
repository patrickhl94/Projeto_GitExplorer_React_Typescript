import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  url: string;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding-bottom: 5px;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }

      .borderList {
        border-bottom-color: #ff872c;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border: ${props => (props.url === '/' ? 1 : 0)};
      }

      .borderImport {
        border-bottom-color: #ff872c;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border: ${props => (props.url === '/import' ? 1 : 0)};
      }
    }
  }
`;
