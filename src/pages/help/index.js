import styled from '@emotion/styled'

export default function Help() {
  return (
    <Container>
      <h1>Help Center</h1>
      <p>Welcome to the Help Center. How can we assist you today?</p>
    </Container>
  )
}

const Container = styled('div')`
  margin: 24px;
  font-size: 1rem;

  h1 {
    font-size: 1.5rem;
  }
`
