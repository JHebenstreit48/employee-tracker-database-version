// bring in any libraries or other files we need
import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';

await connectToDb();
//main fuction or inquirer function to ask user questions

const client = await pool.connect()


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
          addEmployee()
          break

        case 'Update Employee Role':
          updateEmployeeRole()
          break

        case 'View All Roles':
          viewAllRoles()
          break

          case 'Add Role':
          addRole()
          break

          case 'View All Departments':
          viewAllDepartments()
          break

          case 'Add Departments':
          addDepartments()
          break

          case 'Quit':
          quit()
          break
      }
    })
  //look into using a switch statment on this line
  //use the case keyword
  //create a const
  //input SELECT, FROM, JOIN, JOIN, LEFT JOIN

  //next create a pool

  //create additional cases for each additional prompt
}


function viewAllEmployees() {
  client.query('SELECT * FROM EMPLOYEE', function (error, data) {
    if (error) {
      console.log(error)
    }
      console.log(data);

  })
}

function addEmployee() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function updateEmployeeRole() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function viewAllRoles() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function addRole() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function viewAllDepartments() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function addDepartments() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

function quit() {
  client.query('', function(error, data) {
    if (error) {
      console.log(error)
    }
    console.log(data)
  }) 
}

performActions()

// process.exit