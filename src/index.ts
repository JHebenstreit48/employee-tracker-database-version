// bring in any libraries or other files we need
import inquirer from 'inquirer';
import { Database } from './database';
import (Postgres) from 'pg';


//main fuction or inquirer function to ask user questions

performActions(): void {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'action',
              message: 'Select an action',
              choices: [
                'View all employees',
                'Add Employee',
                
            };
                      }),
                    },
                  ])

//this is async which will also use a .then and .catch

//some kind of conditional statement within the .then statement
//if else or switch statement


//based on answer we will run a function or write a function for each of the queries that we want to make for our database

//then re-ask user questions

// findVehicleToTow(truck: Truck): void {
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           name: 'vehicleToTow',
//           message: 'Select a vehicle to tow',
//           choices: this.vehicles.map((vehicle) => {
//             return {
//               name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
//               value: vehicle,
//             };
//           }),
//         },
//       ])
//       .then((answers) => {

//         if (answers.vehicleToTow === truck) {
//           console.log(`Truck cannot tow itself.`)
//         } else {
//           truck.tow(answers.vehicleToTow)
//           // start the cli to return to the initial prompt if the user wants to select or create another vehicle
//           this.performActions();
//       }
//   });
//   }

// performActions(): void {
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           name: 'action',
//           message: 'Select an action',
//           choices: [
//             'Print details',
//             'Start vehicle',
//             'Accelerate 5 MPH',
//             'Decelerate 5 MPH',
//             'Stop vehicle',
//             'Turn right',
//             'Turn left',
//             'Reverse',
//             'Tow',
//             'Wheelie',
//             'Select or create another vehicle',
//             'Exit',
//           ],
//         },
//       ])
//       .then((answers) => {
//         // perform the selected action
//         if (answers.action === 'Print details') {
//           // find the selected vehicle and print its details
//           for (let i = 0; i < this.vehicles.length; i++) {
//             if (this.vehicles[i].vin === this.selectedVehicleVin) {
//               this.vehicles[i].printDetails();
//             }
//           }
//         } else if (answers.action === 'Start vehicle') {
//           // find the selected vehicle and start it
//           for (let i = 0; i < this.vehicles.length; i++) {
//             if (this.vehicles[i].vin === this.selectedVehicleVin) {
//               this.vehicles[i].start();
//             }
//           }
//         } else if (answers.action === 'Accelerate 5 MPH') {
//           // find the selected vehicle and accelerate it by 5 MPH
//           for (let i = 0; i < this.vehicles.length; i++) {
//             if (this.vehicles[i].vin === this.selectedVehicleVin) {
//               this.vehicles[i].accelerate(5);
//             }
//           }
//   
//             }
//           }
//         }

// else if (answers.action === 'Select or create another vehicle') {
//     // start the cli to return to the initial prompt if the user wants to select or create another vehicle
//     this.startCli();
//     return;
//   } else {
//     // exit the cli if the user selects exit
//     this.exit = true;
//   }
//   if (!this.exit) {
//     // if the user does not want to exit, perform actions on the selected vehicle
//     this.performActions();
//   }
// });
// }

// startCli(): void {
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           name: 'CreateOrSelect',
//           message:
//             'Would you like to create a new vehicle or perform an action on an existing vehicle?',
//           choices: ['Create a new vehicle', 'Select an existing vehicle'],
//         },
//       ])
//       .then((answers) => {

//         // check if the user wants to create a new vehicle or select an existing vehicle
//         if (answers.CreateOrSelect === 'Create a new vehicle') {
//           this.createVehicle();
//         } else {
//           this.chooseVehicle();
//         }
//       });
//   }
// }

// export default Cli;