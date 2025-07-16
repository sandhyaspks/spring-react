import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Optional CSS file

const Navbar = () => {
const user = JSON.parse(localStorage.getItem('user'));
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem('user');
navigate('/login');
};

return (
<nav className="navbar">
<div className="nav-left">Employee Management System</div>
<div className="nav-right">
{user?.role === 'Admin' && (
<Link to="/add-employee" className="nav-link">
Add Employee
</Link>
)}
{!user ? (
<>
<Link to="/signup" className="nav-link">Signup</Link>
<Link to="/login" className="nav-link">Login</Link>
</>
) : (
<button onClick={handleLogout} className="nav-button">
Logout
</button>
)}
</div>
</nav>
);
};

export default Navbar;