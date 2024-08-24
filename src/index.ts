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

    .then(async (answers) => {
      switch (answers.action) {
        case 'View all employees':
          viewAllEmployees()

          break

        case 'Add Employee':
          inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'What is the employees first name?'
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'What is the employees last name?'
            },
            {
              type: 'input',
              name: 'roleId',
              message: 'Enter the role ID'
            },
            {
              type: 'input',
              name: 'ManagerId',
              message: 'Enter the manager ID'
            }
          ])
            .then((answers) => {
              addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.ManagerId)
            })
          break

        case 'Update Employee Role':
          inquirer.prompt([
            {
              type: 'input',
              name: 'employeeId',
              message: 'Enter the employee ID'
            },
            {
              type: 'input',
              name: 'roleId',
              message: 'Enter the role ID'
            }
          ])
            .then((answers) => {
              updateEmployeeRole(answers.employeeId, answers.roleId)
            });
          break;

        case 'View All Roles':
          viewAllRoles()
          break

        case 'Add Role':
          // query the database for all departments
          const departmentChoices: any[] = [];
          const data = await getAllDepartments()
          const departments = data.rows;
          departments.forEach(department => {
            departmentChoices.push(department)
          })
          console.log(departmentChoices);
          inquirer.prompt([
            {
              type: 'list',
              name: 'departmentNameWithValue',
              message: 'Please select a department.',
              choices: [
                {
                  value: 1,
                  name: '1: Marketing'
                },
                {
                  value: 2,
                  name: '2: Human Resources'
                },
                {
                  value: 3,
                  name: '3: IT'
                },
                {
                  value: 4,
                  name: '4: Finance'
                },
                {
                  value: 5,
                  name: '5: Research and Development'
                },
                {
                  value: 6,
                  name: '6: Customer Service'
                }
              ]
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
              addRole(answers.title, answers.salary, answers.departmentNameWithValue)
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

function addEmployee(firstName: string, lastName: string, roleId: number, ManagerId: number) {
  client.query('INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, ManagerId], function (error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  })
}

function updateEmployeeRole(employeeId: number, newroleId: number) {
  const updateQuery = `UPDATE EMPLOYEE SET role_id = $1 WHERE id = $2`
  client.query(updateQuery, [newroleId, employeeId], function (error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  })
}

function viewAllRoles() {
  client.query('SELECT * FROM ROLE', function (error, data) {
    if (error) {
      console.log(error)
    }
    console.table(data.rows)
    performActions()
  })
}


function addRole(title: string, salary: number, departmentNameWithValue: number) {
  client.query('SELECT * FROM DEPARTMENT', function (error, departmentData) {
    if (error) {
      console.log(error)
    }
    console.log(departmentData.rows)
    client.query('INSERT INTO ROLE (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentNameWithValue], function (error, data) {
      if (error) {
        console.log(error)
      }
      console.table(data.rows)
      performActions()
    })
  })
}

function viewAllDepartments() {
  client.query('SELECT * FROM DEPARTMENT', function (error, data) {
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
  client.query('INSERT INTO DEPARTMENT (name) VALUES ($1)', [departmentName], function (error, data) {
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