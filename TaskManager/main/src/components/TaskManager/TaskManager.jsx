import { useState } from "react";
import "./taskmanager.css";

/* eslint-disable react/prop-types */
export default function TaskManager({ title }) {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  function handleToggle() {
    setShowAddTaskForm((cur) => !cur);
  }

  function handleAddTask(newTask) {
    setTasks((tas) => [...tas, newTask]);
    setShowAddTaskForm(false);
  }

  function handleToggleChecked(task) {
    setTasks((tasks) =>
      tasks.map((t) => {
        return t.id === task.id ? { ...t, done: !task.done } : t;
      })
    );
  }

  function handleDeleteTask(task) {
    setTasks((tasks) =>
      tasks.filter((t) => {
        return t.id !== task.id;
      })
    );
  }

  function handleEditTask(task) {
    const newName = prompt("Enter new name");
    setTasks((tasks) =>
      tasks.map((t) => {
        return t.id === task.id ? { ...t, title: newName } : t;
      })
    );
  }

  return (
    <div className="task-manager">
      <div className="title">
        {!showAddTaskForm && <h1>{title}</h1>}
        {showAddTaskForm ? (
          <FormAddTask onToggle={handleToggle} onAddTask={handleAddTask} />
        ) : (
          <FormTaskManager
            onEditTask={handleEditTask}
            onToggle={handleToggle}
            tasks={tasks}
            onChangeCheck={handleToggleChecked}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

function FormTaskManager({
  onToggle,
  tasks,
  onChangeCheck,
  onDeleteTask,
  onEditTask,
}) {
  const [filter, setFilter] = useState("all");

  let filteredTasks;

  switch (filter) {
    case "all":
      filteredTasks = tasks;
      break;
    case "done":
      filteredTasks = tasks
        .slice()
        .sort((a, b) => Number(a.done) - Number(!b.done));
      break;
    case "undone":
      filteredTasks = tasks
        .slice()
        .sort((a, b) => Number(a.done) - Number(b.done));
      break;
  }

  return (
    <form className="form-task-manager" onSubmit={(e) => e.preventDefault()}>
      <div className="section-up">
        <Button bgColor={"blue"} width={115} color={"white"} onClick={onToggle}>
          Add Task
        </Button>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>
      <TaskList
        tasks={tasks}
        onChangeCheck={onChangeCheck}
        onDeleteTask={onDeleteTask}
        filteredTasks={filteredTasks}
        onEditTask={onEditTask}
      />
    </form>
  );
}

function FormAddTask({ onToggle, onAddTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskName) return;

    const id = crypto.randomUUID();

    //Created time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    //Created date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${mm}/${dd}/${yyyy}`;

    let newTask = {
      id,
      title: taskName,
      done: false,
      createdTime: formattedTime,
      createdDate: formattedDate,
    };
    onAddTask(newTask);

    setTaskName("");
  }

  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <span className="close" onClick={onToggle}>
        X
      </span>
      <div className="title">
        <h2>Add new task</h2>
        <div className="taskDetailEntry">
          <Input onChange={(e) => setTaskName(e.target.value)} value={taskName}>
            Enter task name
          </Input>
          <Button bgColor={"blue"} color={"white"}>
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}

function Button({ children, onClick, bgColor, width, color }) {
  return (
    <button
      className="button"
      style={{ backgroundColor: bgColor, width: width, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Input({ children, onChange, width, value }) {
  return (
    <input
      className="input"
      style={{ width: width }}
      onChange={onChange}
      placeholder={children}
      value={value}
    />
  );
}

function TaskList({ onChangeCheck, onDeleteTask, filteredTasks, onEditTask }) {
  return (
    <div className="task-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onChangeCheck={onChangeCheck}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      ) : (
        <p>Nothing to see</p>
      )}
    </div>
  );
}

function Task({ onChangeCheck, task, onDeleteTask, onEditTask }) {
  return (
    <div className="task">
      <div className="task-left-section">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onChangeCheck(task)}
        />
        <div className="detail">
          <div className="task-title">
            <span>
              <b>{task.title}</b>
            </span>
          </div>
          <div className="task-date">
            <p>
              {task.createdTime} AM, {task.createdDate}
            </p>
          </div>
        </div>
      </div>
      <div className="task-right-section">
        <Button
          bgColor={"red"}
          color={"white"}
          onClick={() => onDeleteTask(task)}
        >
          Remove
        </Button>
        <Button
          bgColor={"green"}
          color={"white"}
          onClick={() => onEditTask(task)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
