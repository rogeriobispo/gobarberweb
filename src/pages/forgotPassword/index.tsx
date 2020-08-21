import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiMail } from 'react-icons/fi';
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
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormFields) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('E-mail deve ser valido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        //  recuperação de senha.
        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'email de recuperação enviado',
          description: 'Enviamos um email para você verifique seu email',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = ValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" placeholder="Email" icon={FiMail} />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
