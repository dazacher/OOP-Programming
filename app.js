const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Develop/lib/htmlRenderer");
const employeeList = [];


const writeFileAsync = util.promisify(fs.writeFile);
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function userPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Chose which employee you would like to create:",
                choices:
                    [
                        "Create Manager",
                        "Create Engineer",
                        "Create Intern",
                        "Create Team"
                    ]
            }
        ])
        .then(function ({ choice }) {

            switch (choice) {
                case "Create Manager":
                    addManager();
                    break;
                case "Create Engineer":
                    addEngineer();
                    break;
                case "Create Intern":
                    addIntern();
                    break;
                case "Create Team":
                    generateTeam();
                    break;
                default:
                    console.log("Please chose an Employee to add.");
            }
        });
}

function addManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Manager's name?",
                validate: function validateManagerName(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid Manager user name.`
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is your Manager's email address?",
                validate: function(value){
                    var pass = value.match(/^[\w#][\w\.\'+#](.[\w\\'#]+)\@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*\.(.[a-zA-Z]{2,20})$/i)
                    if (pass){
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is you Manager's ID?",
                validate: function validateManagerID(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid ID.`
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your Manager's office number?",
                validate: function validateManagerOfficeNumber(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid office number.`
                }
            }
        ])
        .then(function (answers) {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            
            employeeList.push(manager);
            console.log(employeeList);
            userPrompt();
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Engineer's name?",
                validate: function validateEngineerName(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid Engineer user name.`
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is your Engineer's email address?",
                validate: function(value){
                    var pass = value.match(/^[\w#][\w\.\'+#](.[\w\\'#]+)\@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*\.(.[a-zA-Z]{2,20})$/i)
                    if (pass){
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is you Engineer's ID?",
                validate: function validateEngineerID(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid ID.`
                }
            },
            {
                type: "input",
                name: "github",
                message: "What is your Engineer's GitHub name?",
                validate: function validateGitHubName(value) {
                    let userInput = value;

                    var pass = (value !== "");

                    if (pass) {
                        return true;
                    }
                    return `Please enter a valid GitHub user name.`
                }
            }
        ])
        .then(function (answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
           
            employeeList.push(engineer);
            console.log(employeeList);
            userPrompt();
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Intern's name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your Intern's email address?",
                validate: function(value){
                    var pass = value.match(/^[\w#][\w\.\'+#](.[\w\\'#]+)\@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*\.(.[a-zA-Z]{2,20})$/i)
                    if (pass){
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is you Intern's ID?"
            },
            {
                type: "input",
                name: "school",
                message: "What school is your Intern from?"
            }
        ])
        .then(function (answers) {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            
            employeeList.push(intern);
            console.log(employeeList);
            userPrompt();
        })
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


function generateTeam() {
    const html = render(employeeList);
    fs.mkdir(OUTPUT_DIR, { recursive: true }, function (err) {
        if (err) throw err;
        console.log(html)
        writeFileAsync(outputPath, html)
            .then(() => console.log("Successfully wrote to team.html"))
            .catch(err => console.log(err));
    })
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

userPrompt();
    
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
