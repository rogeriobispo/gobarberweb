import React from 'react';
import { useTransition } from 'react-spring';
import Toast from './toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransations = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransations.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
