import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeTasks = () => {
const { id } = useParams(); 
const [employees, setEmployees] = useState([]);
const [employee, setEmployee] = useState(null);
const [taskInput, setTaskInput] = useState('');
const user = JSON.parse(localStorage.getItem('user'));

useEffect(() => {
const employeeList = JSON.parse(localStorage.getItem('employees')) || [];
setEmployees(employeeList);
const foundEmployee = employeeList.find((emp) => emp.id === id);
setEmployee(foundEmployee);
}, [id]);

const handleAddTask = () => {
if (!taskInput.trim()) return;

javascript
Copy
Edit
const updatedEmployees = employees.map((emp) => {
  if (emp.id === id) {
    const updated = {
      ...emp,
      tasks: [...(emp.tasks || []), taskInput]
    };
    setEmployee(updated); 
    return updated;
  }
  return emp;
});

setEmployees(updatedEmployees);
localStorage.setItem('employees', JSON.stringify(updatedEmployees));
setTaskInput('');
};

if (!employee) return <div><h2>Employee not found</h2></div>;

return (
<div style={{ padding: '30px' }}>
<h2>Tasks for {employee.name}</h2>

javascript
Copy
Edit
  {employee.tasks && employee.tasks.length > 0 ? (
    <ul>
      {employee.tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  ) : (
    <p>No tasks assigned yet.</p>
  )}

  {user?.role === 'Admin' && (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Enter new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <button
        onClick={handleAddTask}
        style={{ padding: '10px 20px', marginLeft: '10px' }}
      >
        Add Task
      </button>
    </div>
  )}
</div>
);
};

export default EmployeeTasks;