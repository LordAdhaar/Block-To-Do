// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract ToDoList {
    enum Priority {
        Low,
        Medium,
        High
    }

    struct Task {
        uint256 id;
        string description;
        Priority priority;
        uint256 dueDate;
        bool completed;
        address owner;
    }

    uint256 private taskCounter;
    mapping(uint256 => Task) private tasks;
    mapping(address => uint256[]) private userTasks;

    event TaskCreated(
        uint256 indexed taskId, string description, Priority priority, uint256 dueDate, address indexed owner
    );
    event TaskEdited(uint256 indexed taskId, string description, Priority priority, uint256 dueDate);
    event TaskCompleted(uint256 indexed taskId);
    event TaskDeleted(uint256 indexed taskId);

    modifier onlyOwner(uint256 _taskId) {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        _;
    }

    function addTask(string memory _description, Priority _priority, uint256 _dueDate) external {
        require(bytes(_description).length > 0, "Description required");
        require(_dueDate > block.timestamp, "Invalid due date");

        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _description, _priority, _dueDate, false, msg.sender);
        userTasks[msg.sender].push(taskCounter);

        emit TaskCreated(taskCounter, _description, _priority, _dueDate, msg.sender);
    }

    function editTask(uint256 _taskId, string memory _description, Priority _priority, uint256 _dueDate)
        external
        onlyOwner(_taskId)
    {
        require(bytes(_description).length > 0, "Description required");
        require(_dueDate > block.timestamp, "Invalid due date");

        Task storage task = tasks[_taskId];
        task.description = _description;
        task.priority = _priority;
        task.dueDate = _dueDate;

        emit TaskEdited(_taskId, _description, _priority, _dueDate);
    }

    function markTaskComplete(uint256 _taskId) external onlyOwner(_taskId) {
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task already completed");

        task.completed = true;
        emit TaskCompleted(_taskId);
    }

    function deleteTask(uint256 _taskId) external onlyOwner(_taskId) {
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }

    function getTask(uint256 _taskId) external view returns (Task memory) {
        return tasks[_taskId];
    }

    function getUserTasks() external view returns (Task[] memory) {
        uint256[] memory userTaskIds = userTasks[msg.sender];
        Task[] memory userTaskList = new Task[](userTaskIds.length);
        for (uint256 i = 0; i < userTaskIds.length; i++) {
            userTaskList[i] = tasks[userTaskIds[i]];
        }
        return userTaskList;
    }
}
