import { use, useState } from "react";

const initialList = [
  { id: 1, task: "Buy groceries", completed: false, day: "today" },
  { id: 2, task: "Finish React project", completed: false, day: "today" },
  { id: 3, task: "Call the bank", completed: false, day: "today" },
  { id: 4, task: "Clean the kitchen", completed: false, day: "today" },
  { id: 5, task: "Walk the dog", completed: false, day: "today" },
  { id: 6, task: "Clean the kitchen", completed: true, day: "yesterday" },
  { id: 7, task: "Write a blog post", completed: false, day: "yesterday" },
  {
    id: 8,
    task: "Exercise for 30 minutes",
    completed: true,
    day: "yesterday",
  },
  { id: 9, task: "Read a book", completed: false, day: "yesterday" },
  {
    id: 10,
    task: "Prepare meals for the week",
    completed: true,
    day: "yesterday",
  },
  { id: 11, task: "Attend a meeting", completed: false, day: "tomorrow" },
  { id: 12, task: "Go grocery shopping", completed: false, day: "tomorrow" },
  {
    id: 13,
    task: "Finish the project report",
    completed: false,
    day: "tomorrow",
  },
  { id: 14, task: "Visit the dentist", completed: false, day: "tomorrow" },
  { id: 15, task: "Learn a new recipe", completed: false, day: "tomorrow" },
  {
    id: 16,
    task: "Schedule a doctor's appointment",
    completed: false,
    day: "tomorrow",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialList);
  const [day, setDay] = useState("today");
  const [sortBy, setSortBy] = useState("default");

  function handleDay(day) {
    setDay(day);
    console.log(day);
  }

  function handleAddTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    console.log(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="app">
      <Header onDay={handleDay} />
      <ToDoList
        day={day}
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CreateNewTask
        onAddTasks={handleAddTasks}
        day={day}
        tasks={tasks}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}

function Header({ onDay }) {
  return (
    <div className="header">
      <div className="name">
        <h1>Good Morning, Voo!👋🏻</h1>
        <h2>Today, Tue 14 Jan 2025</h2>
      </div>
      <div className="day">
        <select className="day-select" onChange={(e) => onDay(e.target.value)}>
          <option value="yesterday">Yesterday</option>
          <option value="today" selected>
            Today
          </option>
          <option value="tomorrow">Tomorrow</option>
        </select>
        <div className="day-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="undefined"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </div>
        {/* <label>Today</label> */}
      </div>
    </div>
  );
}

function ToDoList({
  tasks,
  onDeleteTask,
  onToggleTask,
  day,
  sortBy,
  setSortBy,
}) {
  let sortedTask;
  if (sortBy === "default") sortedTask = tasks;
  if (sortBy === "status")
    sortedTask = tasks
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  console.log(sortedTask);

  return (
    <div className="list">
      <ul>
        {sortedTask.map(
          (task) =>
            task.day === day && (
              <Task
                task={task}
                key={task.id}
                onDeleteTask={onDeleteTask}
                onToggleTask={onToggleTask}
              />
            )
        )}
      </ul>
    </div>
  );
}

function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <li className="todo">
      <label className="checkbox">
        <input
          type="checkbox"
          value={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span>
          <svg
            className={task.completed ? "checked" : ""}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="transparent"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </span>
      </label>

      <label className={task.completed ? "task-completed" : "todo-text"}>
        {task.task}
      </label>
      <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--primary-text-color: #181a1e)"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </li>
  );
}

function CreateNewTask({ onAddTasks, day, tasks, sortBy, setSortBy }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const newTask = { task, completed: false, id: Date.now(), day: day };

    onAddTasks(newTask);

    setTask("");
  }

  return (
    <div className="footer">
      <form onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Create new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="addButton">+</button>
      </form>
      <Sort sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
}

function Sort({ tasks, sortBy, setSortBy }) {
  return (
    <>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Sort by Default</option>
        <option value="status">Sort by Status</option>
      </select>
    </>
  );
}
