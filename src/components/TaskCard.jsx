import React from 'react';

const TaskCard = ({ task, onToggle }) => {
  return (
    <div className={`task-card ${task.done ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="checkmark"></span>
        <span className="task-text">{task.name}</span>
      </label>
      {task.done && <span className="completion-icon">✨</span>}
    </div>
  );
};

export default TaskCard;