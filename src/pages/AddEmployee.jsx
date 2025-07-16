import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddEmployee = () => {
const [searchParams] = useSearchParams();
const employeeId = searchParams.get('id');
const [name, setName] = useState('');
const navigate = useNavigate();
const isEdit = !!employeeId;

useEffect(() => {
const all = JSON.parse(localStorage.getItem('employees')) || [];
const existing = all.find(emp => emp.id === employeeId);
if (existing) setName(existing.name);
}, [employeeId]);

const handleSubmit = (e) => {
e.preventDefault();
const employees = JSON.parse(localStorage.getItem('employees')) || [];

javascript
Copy
Edit
if (isEdit) {
  const updated = employees.map(emp =>
    emp.id === employeeId ? { ...emp, name } : emp
  );
  localStorage.setItem('employees', JSON.stringify(updated));
} else {
  const newEmp = {
    id: Date.now().toString(),
    name,
    tasks: []
  };
  employees.push(newEmp);
  localStorage.setItem('employees', JSON.stringify(employees));
}

navigate('/');
};

return (
<div>
<h2>{isEdit ? 'Edit' : 'Add'} Employee</h2>
<form onSubmit={handleSubmit}>
<label>Name:</label><br />
<input value={name} onChange={e => setName(e.target.value)} required />
<br /><br />
<button type="submit">{isEdit ? 'Update' : 'Add'}</button>
</form>
</div>
);
};

export default AddEmployee;