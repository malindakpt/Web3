pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    constructor() public {
        createTask("Start");
        createTask("This is first task Malinda 1 Updates");
        createTask("This is first task Malinda 2");
         createTask("End");
    }

    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, true);
    }

}