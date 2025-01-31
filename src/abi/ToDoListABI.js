const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "enum ToDoList.Priority",
                "name": "_priority",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_dueDate",
                "type": "uint256"
            }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "deleteTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "enum ToDoList.Priority",
                "name": "_priority",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_dueDate",
                "type": "uint256"
            }
        ],
        "name": "editTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "markTaskComplete",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "taskId",
                "type": "uint256"
            }
        ],
        "name": "TaskCompleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "taskId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum ToDoList.Priority",
                "name": "priority",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "dueDate",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "TaskCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "taskId",
                "type": "uint256"
            }
        ],
        "name": "TaskDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "taskId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum ToDoList.Priority",
                "name": "priority",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "dueDate",
                "type": "uint256"
            }
        ],
        "name": "TaskEdited",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "getTask",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "enum ToDoList.Priority",
                        "name": "priority",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "completed",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct ToDoList.Task",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUserTasks",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "enum ToDoList.Priority",
                        "name": "priority",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "completed",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct ToDoList.Task[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default contractABI;