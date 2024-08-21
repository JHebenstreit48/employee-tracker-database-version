// bring in any libraries or other files we need
import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';

await connectToDb();
//main fuction or inquirer function to ask user questions

const client = await pool.connect()
async function queryDatabase(query: string, args: any[]) {
  const result = await client.query(query, args);
  return result;
}
const performActions = (): void => {

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
          'Quit'
        ]
      }
    ])

    .then((answers) => {
      switch (answers.action) {
        case 'View all employees':
          viewAllEmployees()

          break

        case 'Add Employee':
          inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'What is the employeees first name?'
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'What is the employeees last name?'
            },
            {
              type: 'input',
              name: 'roleID',
              message: 'Enter the role ID'
            },
            {
              type: 'input',
              name: 'managerID',
              message: 'Enter the manager ID'
            }
          ])
          .then((answers) => {
            addEmployee(answers.firstName, answers.lastName, answers.role_id, answers.managerID)
          })
          break

        case 'Update Employee Role':
          inquirer.prompt([
            {
              type: 'input',
              name: 'employeeID',
              message: 'Enter the employee ID'
            },
            {
              type: 'input',
              name: 'roleID',
              message: 'Enter the role ID'
            }
          ])
          .then((answers) => {
            updateEmployeeRole(answers.employeeID, answers.roleID)
          });
          break;

        case 'View All Roles':
          viewAllRoles()
          break

          case 'Add Role':
            // query the database for all departments
            const departmentChoices: any[] = [];
            getAllDepartments().then(data => {
              console.log(data.rows);
              
              const departments = data.rows;
              departments.forEach(department => {
                departmentChoices.push(department)
              })
            }
            );

            console.log(departmentChoices);
            inquirer.prompt([
              {
                type: 'list',
                name: 'action',
                message: 'Please select a department.',
                choices: ['test']
              },
              {
                type: 'input',
                name: 'title',
                message: 'Please enter the role title.'
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary for this role.'
              }
            ])
            .then((answers) => {
              console.log(answers);
              addRole(answers.title, answers.salary, answers.departmentID)
            })
          break

          case 'View All Departments':
          viewAllDepartments()
          break

          case 'Add Departments':
            inquirer.prompt([
              {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the department name'
              }
            ])
            .then((answers) => {
              addDepartments(answers.departmentName)
            })
          break

          case 'Quit':
          quit()
          break
      }
    })
}

function viewAllEmployees() {
  client.query('SELECT * FROM EMPLOYEE', function (error, data) {
    if (error) {
      console.log(error)
    }
      console.table(data.rows);
      performActions()
  })
}

function addEmployee(firstName: string, lastName: string, roleID: number, managerID: number) {
  client.query('INSERT INTO EMPLOYEE (name) VALUES ($1)', [firstName, lastName, roleID, managerID], function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
}

function updateEmployeeRole(employeeID: number, newRoleId: number) {
  const updateQuery = `UPDATE EMPLOYEE SET role_id = $1 WHERE id = $2`
  client.query(updateQuery, [newRoleId, employeeID], function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
}

function viewAllRoles() {
  client.query('SELECT * FROM ROLE', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
}


function addRole(title: string, salary: number, departmentID: number) {
  client.query('SELECT * FROM DEPARTMENT', function(error, departmentData) {
    if (error) {
      console.log(error)
    }
    console.log(departmentData.rows)
  client.query('INSERT INTO ROLE (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentID], function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
})
}

function viewAllDepartments() {
  client.query('SELECT * FROM DEPARTMENT', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
}

function getAllDepartments() {
  return queryDatabase('SELECT * FROM DEPARTMENT;', []);
}

function addDepartments(departmentName: string) {
  client.query('INSERT INTO DEPARTMENT (name) VALUES ($1)', [departmentName], function(error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  }) 
}

function quit() {
  process.exit(0)
  }

performActions()

// process.exit