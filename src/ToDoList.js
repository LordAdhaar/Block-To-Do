import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from './abi/ToDoListABI';
import { useCopilotReadable } from "@copilotkit/react-core";

import './ToDoList.css';

const ToDoList = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    priority: '0',
    dueDate: ''
  });
  const [editingTask, setEditingTask] = useState(null);

  const contractAddress = "0x34539AEFc01E3e35883be3B73fBCe229520A9bf7";

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(tasks)
  });

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);

          setWeb3(web3Instance);
          setContract(contractInstance);
          setAccount(accounts[0]);

          loadTasks(contractInstance, accounts[0]);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      }
    };

    initWeb3();
  }, []);

  const parseTasks = (rawTasks) => {
    return rawTasks
      .filter(task => Number(task[0]) !== 0) // Filter out tasks with id 0
      .map(task => ({
        id: Number(task[0]),
        description: task[1],
        priority: Number(task[2]),
        dueDate: Number(task[3]),
        completed: task[4],
        owner: task[5]
      }));
  };

  const loadTasks = async (contractInstance, userAccount) => {
    try {
      const userTasks = await contractInstance.methods.getUserTasks().call({ from: userAccount });
      const parsedTasks = parseTasks(userTasks);
      setTasks(parsedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const timestamp = Math.floor(new Date(newTask.dueDate).getTime() / 1000);
      await contract.methods
        .addTask(newTask.description, Number(newTask.priority), timestamp)
        .send({ from: account });

      loadTasks(contract, account);
      setNewTask({ description: '', priority: '0', dueDate: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      const timestamp = Math.floor(new Date(editingTask.dueDate).getTime() / 1000);
      await contract.methods
        .editTask(
          editingTask.id.toString(),
          editingTask.description,
          Number(editingTask.priority),
          timestamp
        )
        .send({ from: account });

      loadTasks(contract, account);
      setEditingTask(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTask({
      ...task,
      dueDate: new Date(task.dueDate * 1000).toISOString().split('T')[0]
    });
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await contract.methods.markTaskComplete(taskId.toString()).send({ from: account });
      loadTasks(contract, account);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await contract.methods.deleteTask(taskId.toString()).send({ from: account });
      loadTasks(contract, account);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority.toString()) {
      case '0': return 'priority-low';
      case '1': return 'priority-medium';
      case '2': return 'priority-high';
      default: return 'priority-low';
    }
  };

  return (
    <div className="todo-container">

      <div className="todo-card">
        <h1 className="todo-title">BlockToDo</h1>

        <div className="add-task-form">
          <input
            type="text"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="task-input"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="priority-select"
          >
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="date-input"
          />
          <button onClick={handleAddTask} className="add-button">
            Add Task
          </button>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              {editingTask?.id === task.id ? (
                <div className="edit-task-form">
                  <input
                    type="text"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="task-input"
                  />
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    className="priority-select"
                  >
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                  </select>
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    className="date-input"
                  />
                  <div className="edit-actions">
                    <button onClick={handleEditTask} className="save-button">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <span className={`task-description ${task.completed ? 'completed' : ''}`}>
                      {task.description}
                    </span>
                    <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                      {['Low', 'Medium', 'High'][task.priority]}
                    </span>
                    <span className="due-date">
                      Due: {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <div className="task-actions">
                    {!task.completed && (
                      <>
                        <button
                          onClick={() => startEditing(task)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="complete-button"
                        >
                          Complete
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ToDoList;