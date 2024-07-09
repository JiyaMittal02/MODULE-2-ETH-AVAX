// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        string description;
        bool isCompleted;
    }

    Task[] public tasks;

    // Function to add a new task
    function addTask(string memory _description) public {
        tasks.push(Task(_description, false));
    }

    // Function to get all tasks
    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    // Function to mark a task as completed
    function completeTask(uint _index) public {
        require(_index < tasks.length, "Invalid task index");
        tasks[_index].isCompleted = true;
    }
}
