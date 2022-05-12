import React, { FormEvent, useRef } from 'react';
import Chat from './components/Chat/Chat';
import { onHandleChat } from './services/chat';

const App = () => {
  const [ message, setMessage ] = React.useState('Hello World');

  const refInput = useRef<HTMLDivElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onHandleChat(message);
    setMessage('');

    if (refInput.current) {
      refInput.current.focus();
    }
  };

  return (
    <div>
      Socket IO
      <form onSubmit={ onSubmit }>
        <input
          value={ message }
          onChange={ (e) => setMessage(e.target.value) }
          ref={ refInput as React.Ref<HTMLInputElement> }
        />
        <button type='submit'>
          Enviar Mensagem
        </button>
      </form>
      <section>
        <Chat />
      </section>
    </div>
  );
};

export default App;