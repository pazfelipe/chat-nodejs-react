import React, { useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../libs/socketio';

type MESSAGE = {
  message: string;
  user: string;
  timestamp: string;
};


const StyledMessage = styled('div')`
display: block;
margin: 0 auto;
margin-bottom: 5px;
border-radius: 5px;
padding: 10px;
background: #00000020;

&.message-user {
  background: #00ff0040;
}

&.message-other {
  background: #aa002020;
}
`;

const Chat = () => {
  const [ messages, setMessages ] = React.useState<MESSAGE[]>([]);

  const getUserId = () => {
    return JSON.parse(localStorage.getItem('session') as string).id;
  };


  useEffect(() => {
    socket.on('message received', data => {
      console.warn(data);
      setMessages([ ...messages, data ]);
    });
  }, [ messages ]);

  return (
    <div>
      Chat
      {
        messages.map(({ message, user }, index) => {
          return <StyledMessage key={ index }
            className={ user === getUserId() ? 'message-user' : 'message-other' }
          >
            <strong>{ user }: </strong>
            <span>
              { message }
            </span>
          </StyledMessage>;
        })
      }
    </div>
  );
};

export default Chat;