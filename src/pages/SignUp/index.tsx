import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import ValidationErrors from '../../utils/getValidationError';
import Logo from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import Api from '../../services/apiClient';

import { Container, Content, Background, AnimationContainer } from './styles';

interface FormFields {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormFields) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('E-mail deve ser valido'),
          password: Yup.string().min(6, 'no minimo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await Api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Cadastro realizado ',
          description: 'Você já pode fazer seu logon',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = ValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber" />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ name: '', email: '', password: '' }}
          >
            <h1>Faça seu cadastro</h1>
            <Input name="name" placeholder="nome" icon={FiUser} />

            <Input name="email" placeholder="Email" icon={FiMail} />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
