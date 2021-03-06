import * as React from 'react';
import styled from 'styled-components';

export const FORM_NAME = 'job';
const BOT_FIELD = 'bot-field';

const TextInput = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

const FileInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: #000;
`;

const MultilineInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
`;

const SubmitButton = styled.button`
  background: #fff;
  border: none;
  padding: 4px 10px;
`;

const fields = [
  {
    name: 'firstName',
    label: 'Prénom',
    component: TextInput,
    props: {
      type: 'text',
      required: true,
    },
  },
  {
    name: 'lastName',
    label: 'Nom',
    component: TextInput,
    props: {
      type: 'text',
      required: true,
    },
  },
  {
    name: 'email',
    label: 'Email',
    component: TextInput,
    props: {
      type: 'email',
      required: true,
    },
  },
  {
    name: 'attachment',
    label: 'CV',
    component: FileInput,
    props: {
      type: 'file',
      required: false,
      accept: '.doc,.docx,.pdf,.md,.markdown,.txt',
    },
  },
  {
    name: 'link',
    label: 'Lien',
    component: TextInput,
    props: {
      type: 'text',
      required: false,
      placeholder: 'LinkedIn, Github, etc.',
    },
  },

  {
    name: 'message',
    label: 'Message',
    component: MultilineInput,
    props: {
      cols: 40,
      rows: 8,
      required: true,
    },
  },
];

const JobApplicationForm: React.FunctionComponent = () => (
  <form
    name={FORM_NAME}
    method="POST"
    action="/jobs/thanks"
    data-netlify
    data-netlify-honeypot={BOT_FIELD}
  >
    <input type="hidden" name={BOT_FIELD} />

    {fields.map(({ name, component, props, label }) => (
      <FieldWrapper key={name}>
        <Label>
          {label}
          {props.required ? ' *' : null}
        </Label>
        {React.createElement(component, { name, ...props })}
      </FieldWrapper>
    ))}

    <FieldWrapper>
      <SubmitButton type="submit">Envoyer</SubmitButton>
    </FieldWrapper>
  </form>
);

export default JobApplicationForm;

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
