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
const answers = "";
let role = "";


const writeFileAsync = util.promisify(fs.writeFile);
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function userPrompt() {
    return inquirer
        .prompt([

        ])
        .then(function (employees) {
            console.log(employees);


        })

        .then(function (answers, ...employees) {
            return inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "again",
                        message: "Do you want to enter another Team Member?",
                        default: true,
                        //userPrompt()
                    }
                ])
        })
}

function addManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Manager's name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your Manager's email address?"
            },
            {
                type: "input",
                name: "id",
                message: "What is you Manager's ID?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your Manager's office number?"
            }
        ])
        .then(function (answers) {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            var obj = {
                role: manager.getRole(),
                name: manager.getName(),
                id: manager.getId(),
                email: manager.getEmail(),
                officeNumber: manager.getOfficeNumber()
            }
            employeeList.push(obj);
            userPrompt();
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Engineer's name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your Engineer's email address?"
            },
            {
                type: "input",
                name: "id",
                message: "What is you Engineer's ID?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your Engineer's GitHub name?"
            }
        ])
        .then(function (answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            var obj = {
                role: engineer.getRole(),
                name: engineer.getName(),
                id: engineer.getId(),
                email: engineer.getEmail(),
                github: engineer.getGithub()
            }
            employeeList.push(obj);
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
                message: "What is your Intern's email address?"
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
            var obj = {
                role: intern.getRole(),
                name: intern.getName(),
                id: intern.getId(),
                email: intern.getEmail(),
                school: intern.getSchool()
            }
            employeeList.push(obj);
            userPrompt();
        })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!





// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// const writeFileAsync = await ("../output/team.html", html);

userPrompt()
    .then((role, answers, ...employees) => {
        console.log(employees)
        console.log(role);
        console.log(answers);
        const html = render(employees);

        return writeFileAsync("./output/team.html", html);
    })
    .then(() => {

        console.log("Successfully wrote to team.html");
    })
    .catch(function (err) {
        console.log(err);
    })
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
