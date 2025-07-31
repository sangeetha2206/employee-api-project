const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample employee data
let employees = [
    {
        id: 1,
        name: "John Doe",
        role: "Developer",
        email: "john@example.com",
        mobileNumber: "1234567890",
        location: "New York"
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Designer",
        email: "jane@example.com",
        mobileNumber: "9876543210",
        location: "London"
    }
];

// Routes
app.get('/', (req, res) => {
    res.send('Employee Management API');
});

// Create employee
app.post('/api/employees', (req, res) => {
    const { name, role, email, mobileNumber, location } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newEmployee = {
        id: employees.length + 1,
        name,
        role,
        email,
        mobileNumber,
        location
    };
    
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Get all employees
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// Get single employee
app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    employee.name = req.body.name || employee.name;
    employee.role = req.body.role || employee.role;
    employee.email = req.body.email || employee.email;
    employee.mobileNumber = req.body.mobileNumber || employee.mobileNumber;
    employee.location = req.body.location || employee.location;

    res.json(employee);
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const employeeIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (employeeIndex === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    employees.splice(employeeIndex, 1);
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
