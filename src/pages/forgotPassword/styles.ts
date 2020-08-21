import Styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import SignInBackgrountImg from '../../assets/images/sign-in-background.png';

const Container = Styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

`;

const Content = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  width: 100%;
  max-width: 700px;

  }

   > a {
      color #ff9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      transition: color .2s;

      &:hover{
        color: ${shade(0.2, '#ff9000')}
      }

      svg {
        margin-right: 16px;
      }

   }
`;
const Background = Styled.div`
  flex: 1;
  background: url(${SignInBackgrountImg}) no-repeat center;
  background-size: cover;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

const AnimationContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
`;

export { Container, Content, Background, AnimationContainer };
