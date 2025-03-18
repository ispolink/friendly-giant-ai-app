import styled from '@emotion/styled';
import Header from './header';

export default function RootLayout({ children, className, ...props }) {

  return (
    <Container className={className} {...props}>
      <Header />
      <Content>
        {children}
      </Content>
    </Container>
  );
}


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.theme.palette.colors.default};
`

const Content = styled.div`
  color: ${props => props.theme.palette.text.primary};
  a {
    color: ${props => props.theme.palette.colors.anchor.normal};
  }
`

