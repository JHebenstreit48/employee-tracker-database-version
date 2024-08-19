// bring in any libraries or other files we need
import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
await connectToDb();
//main fuction or inquirer function to ask user questions
const client = await pool.connect();
const performActions = () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action',
            choices: [
                'View all employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Departments',
                'quit'
            ]
        }
    ])
        .then((answers) => {
        switch (answers.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
        }
    });
    //look into using a switch statment on this line
    //use the case keyword
    //create a const
    //input SELECT, FROM, JOIN, JOIN, LEFT JOIN
    //next create a pool
    //create additional cases for each additional prompt
};
function viewAllEmployees() {
    client.query('SELECT * FROM EMPLOYEE', function (error, data) {
        if (error) {
            console.log(error);
        }
        console.log(data);
    });
}
function addEmployee() {
    console.log('Add Employee');
}
performActions();
// process.exit
