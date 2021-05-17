const inquirer = require("inquirer");
const figlet = require("figlet");
const consoleTable = require("console.table");
const db = require("./db/connections.js");
//==========================
// ASCII TEXT using Figlet
//==========================
console.log(figlet.textSync("Employee Tracker", {
    font: 'slant',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 70,
    whitespaceBreak: true
}));
const runDB = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['Add an associate',
                    'Remove an associate',
                    'Update an associates role',
                    'View all associates',
                    'View all roles',
                    'View all departments',
                    'Nothing']
        }
    ])
    .then (data =>{
        if(data.prompt == 'Add an associate'){
            addEmployee()
        } else if (data.prompt == 'Remove an associate'){
            removeEmployee()
        } else if (data.prompt == 'Update an associates role'){
            updateEmployeeRole()
        } else if (data.prompt == 'View all associates'){
            db.query (`SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.name, CONTACT(e.first_name, ' ' ,e.last_name)
                AS Manager FROM employees 
                INNER JOIN roles on roles.id = employees.role_id 
                INNER JOIN department on department.id = roles.department_id 
                LEFT JOIN employees e on employees.manager_id = e.id;`,
                function (err,res) {
                    if (err) throw err
                    console.table(res)
                    runDB()
                })
        } else if(data.prompt == 'View all roles'){
            db.query(`SELECT employees.first_name, employees.last_name, roles.title
                    AS Title FROM employees
                    JOIN roles ON employees.role_id = roles.id;`,
                    function(err,res){
                    if (err) throw err
                    console.table(res)
                    runDB();
                    })
        } else if (data.prompt == 'View all departments') {
            db.query (`SELECT employees.first_name, employees.last_name, department.name 
                    AS Department FROM employees 
                    JOIN roles ON employees.role_id = roles.id 
                    JOIN department ON roles.department_id = department.id 
                    ORDER BY employees.id;`,
                    function(err,res) {
                    if(err) throw err
                    console.table(res)
                    runDB();
                })
            }else if (data.prompt == 'Nothing'){
                console.log ('Press CTRL + C to exit.')
                return data;
            }
    })
}

function addEmployee() {
    console.log(figlet.textSync('Add Associate', {
        font: 'slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: '70',
        whitespaceBreak: true
    }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is this associate's first name? (REQUIRED!)",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the associate's last name? (required)",
            validate: lastName => {
                if (lastName) {
                  return true;
                } else {
                  console.log('Please enter a last name.');
                  return false;
                }
              }
        },
        {
            type: 'list',
            name: 'roleId',
            message: "What's the associate's role ID? (required)",
            choices: ['1', '2', '3', '4', '5']
        },
        {
            type: 'list',
            name: 'managerId',
            message: "What's the associate's manager ID? (required)",
            choices: ['1', '3', 'null']
        }
    ])
    .then(data => {
        const sql = `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`
        const params = [data.firstName, data.lastName, data.managerId, data.roleId]

        db.query(sql, params, (err, result) => {
            if (err) throw err
            console.log('Associate has been added successfully ✓')
            console.table(data)
            runDB();
        })
    })
}
function removeEmployee() {
    console.log(figlet.textSync('Remove Associate', {
        font: 'slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 70,
        whitespaceBreak: true
    }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteEmployee',
            message: 'Input the ID of the associate you want to delete. (Required)',
            validate: deleteEmployee => {
                if (deleteEmployee) {
                  return true;
                } else {
                  console.log('Please enter a valid ID.');
                  return false;
                }
              }
        }
    ])
    .then(data => {
        const sql = `DELETE FROM employees WHERE id = ?`
        const params = [data.deleteEmployee]

        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Associate has been removed!')
            console.table(data)
            runDB()
        })
    })
}

function updateEmployeeRole() {
    console.log(figlet.textSync('Update Employee', {
        font: 'slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 70,
        whitespaceBreak: true
    }));

    inquirer.prompt([
        {
            type: 'input',
            name:'employeeId',
            message: "What's the associate's ID you want to update? (Required)",
            validate: employeeId => {
                if (employeeId) {
                  return true;
                } else {
                  console.log('Please enter a valid ID.');
                  return false;
                }
              }
        },
        {
            type: 'list',
            name: 'roleId',
            message: "What would you like their new role ID to be?",
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        }
    ])
    .then(data => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
        const params = [data.roleId, data.employeeId]

        db.query(sql, params, (err, result) => {
            if(err) throw err
            console.log('Associate has been updated!')
            console.table(data)
            runDB()

        })
    })
}

runDB()