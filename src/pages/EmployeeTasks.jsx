import { useParams } from 'react-router-dom';

const EmployeeTasks = () => {
const { id } = useParams();
const employees = JSON.parse(localStorage.getItem('employees')) || [];
const employee = employees.find(emp => emp.id === id);

return (
<div>
<h2>Tasks for {employee?.name}</h2>
<ul>
{employee?.tasks?.length > 0 ? (
employee.tasks.map((task, idx) => <li key={idx}>{task}</li>)
) : (
<p>No tasks assigned.</p>
)}
</ul>
</div>
);
};

export default EmployeeTasks;