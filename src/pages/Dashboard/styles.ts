import Styled from 'styled-components';

const Container = Styled.div`
`;

const Header = Styled.header`
  padding: 32px 0;
  background: #28262e;
`;

const HeaderContent = Styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
  }
`;

const Profile = Styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ebe8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

const Content = Styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
const Schedule = Styled.div`
  flex: 1;
  margin-right: 120px;
  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }


`;
const NextAppointment = Styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;
const Calendar = Styled.aside`
  width: 380px;
`;

export {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
};
