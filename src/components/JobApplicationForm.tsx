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
  <form name={FORM_NAME} method="POST" data-netlify netlify-honeypot={BOT_FIELD}>
    <BotField>
      <label>Don’t fill this out if you're human:</label>
      <input name={BOT_FIELD} />
    </BotField>
    {fields.map(({ component, props, label }) => (
      <FieldWrapper>
        <Label>{label}:</Label>
        {React.createElement(component, props)}
      </FieldWrapper>
    ))}

    <FieldWrapper>
      <button type="submit">Send</button>
    </FieldWrapper>
  </form>
);

const BotField = styled.div`
  display: none;
`;

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
