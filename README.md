# Block-To-Do

Block-To-Do is a blockchain-based To-Do application integrated with AI features to enhance task management efficiency. This decentralized application ensures data integrity and security by leveraging blockchain technology.

## Live Website

[https://block-todo.netlify.app/](https://block-todo.netlify.app/)

## Key Features

1. **Task Management**:
   - **Add Tasks**: Create new tasks with descriptions, priorities, and due dates.
   - **Edit Tasks**: Modify existing tasks to update details as needed.
   - **Delete Tasks**: Remove tasks that are no longer relevant.
   - **Mark as Complete**: Indicate when tasks are finished to keep track of progress.

2. **AI Assistant**:
   - **Prioritization**: Receive intelligent suggestions to prioritize tasks based on urgency and importance.
   - **Schedule Queries**: Ask questions about your schedule and get AI-driven responses to manage your time effectively.

3. **Blockchain Integration**:
   - **Data Integrity**: Tasks are stored on the blockchain, ensuring they remain tamper-proof and transparent.
   - **Decentralization**: Eliminates the need for a central authority, enhancing data security and user control.

## How to Interact with the Live Website

1. **Install MetaMask**: Download and install the MetaMask Chrome extension to manage your wallet.
2. **Enable Test Network**: In MetaMask, enable the "Test Network" option to interact with a test network.
3. **Get Test Sepolia**:
   - Go to [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
   - Follow the instructions to receive test Sepolia ETH to use on the Sepolia network.

Once you're set up, visit the live website and connect your MetaMask wallet to interact with the application.

## How to Run Locally

1. **Clone the Repo**: Clone the project repository to your local machine.
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**: Navigate to the project folder and run the following command to install the dependencies.
   ```bash
   npm install
   ```

3. **Create `.env` File**: Create a `.env` file in the root directory and add your CopilotKit API key as follows:
   ```bash
   REACT_APP_COPILOT_API_KEY=YOUR_PRIVATE_KEY
   ```
   You can obtain your CopilotKit API key from https://www.copilotkit.ai/

4. **Start the Development Server**: Run the following command to start the app locally.
   ```bash
   npm start
   ```

5. **Ensure MetaMask and Sepolia ETH**: Make sure you have MetaMask installed and have some Sepolia ETH to interact with the smart contract. You can refer to the "How to Interact with the Live Website" section above for instructions on enabling Sepolia on MetaMask and getting test Sepolia ETH.
