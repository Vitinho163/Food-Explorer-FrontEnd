import { styled } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-inline: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    padding-inline: 10.8rem;
  }
`

export const Form = styled.form`
  width: 100%;
  margin-top: 7.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4.2rem;
  
  h2 {
    font-family: Poppins;
    font-style: normal;
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 140%;
    color: ${({ theme }) => theme.colors.light_100};
    text-align: center;
    display: none;
  }

  a {
    font-family: Poppins;
    font-style: normal;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light_100};
    margin-bottom: 18rem;
  }

  @media (min-width: 768px) {
    max-width: 48rem;
    background-color: ${({ theme }) => theme.colors.dark_700};
    padding: 6.4rem;
    border-radius: 1.6rem;

    h2 {
      display: block;
    }

    a {
      margin-bottom: 0;
    }
  }
`