import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoList from './ToDoList';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CopilotKit publicApiKey={process.env.REACT_APP_PUBLIC_API_KEY}>
      <ToDoList />
      <CopilotSidebar
        labels={{
          title: "Sidebar Assistant",
          initial: "How can I help you today?"
        }}
        instructions="You are assisting the user as best as you can. Answer in the best possible way"
      />
    </CopilotKit>
  </React.StrictMode>
);
