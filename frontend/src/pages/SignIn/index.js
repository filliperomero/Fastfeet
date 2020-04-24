import React from 'react';
import { Form } from '@unform/web';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSubmit({ email, password }) {
    // Do something
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <input name="email" type="email" placeholder="exemplo@email.com" />

        <strong>SUA SENHA</strong>
        <input name="password" type="password" placeholder="******" />

        <button type="submit">Entrar no Sistema</button>
      </Form>
    </>
  );
}
