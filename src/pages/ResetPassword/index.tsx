import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import ValidationErrors from '../../utils/getValidationError';
import Logo from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/apiClient';

interface FormFields {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormFields) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatório'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), ''],
            'Confirmação diferente',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description: 'Ocorreu um erro ao resetar sua senha tente novamente',
          });
        }

        api.post('passowrd/reset', {
          password_confirmation: data.passwordConfirmation,
          password: data.password,
        });
        history.push('/signin');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = ValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha tente novamente',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da nova senha "
              icon={FiLock}
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
