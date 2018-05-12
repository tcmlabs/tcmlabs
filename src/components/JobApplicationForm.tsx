import * as React from 'react';
import styled from 'styled-components';

export const FORM_NAME = 'job';
const BOT_FIELD = 'bot-field';

const Input = styled.input`
  width: 300px;
`;

const fields = [
  {
    name: 'firstName',
    label: 'Prénom',
    component: Input,
    props: {
      type: 'text',
    },
  },
  {
    name: 'lastName',
    label: 'Nom',
    component: Input,
    props: {
      type: 'text',
    },
  },
  {
    name: 'email',
    label: 'Email',
    component: Input,
    props: {
      type: 'email',
    },
  },
  {
    name: 'message',
    label: 'Message',
    component: 'textarea',
    props: {
      cols: 40,
      rows: 8,
    },
  },
];

export default () => (
  <form name={FORM_NAME} method="POST" data-netlify data-netlify-honeypot={BOT_FIELD}>
    <input type="hidden" name={BOT_FIELD} />

    {fields.map(({ name, component, props, label }) => (
      <FieldWrapper>
        <Label>{label}:</Label>
        {React.createElement(component, { name, ...props })}
      </FieldWrapper>
    ))}

    <FieldWrapper>
      <button type="submit">Envoyer</button>
    </FieldWrapper>
  </form>
);

const FieldWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100px;

  vertical-align: top;
  line-height: 24px;
`;
