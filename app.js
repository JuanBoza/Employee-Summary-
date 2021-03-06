const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = []; 

inquirer.prompt([
    {
        type: "input", 
        message: "Manager name", 
        name: "name", 
        default: "Jimmy"
    }, 
    {
        type: "input", 
        message: "Manager ID ", 
        name: "id", 
        default: "1"
    },
    {
        type: "input", 
        message: "Managers email", 
        name: "email", 
        default: "Jimmy"
    },
    {
        type: "input", 
        message: "Office Number", 
        name: "Office Number", 
        default: "1"
    }, 
    {
        type: "list", 
        message: "add additional members?",
        name: 'add', 
        choices: ['yes', 'no'], 
    },

    
]).then(function(managerAnswers){
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    employees.push(manager);



makeNewEmployees()

}); 
function makeNewEmployees(){
inquirer.prompt([{

    type: "list",
    message: 'Employee Category', 
    name: 'type',
    choices: [
        'Engineer',
        'Intern',
        'No more employees'
    ], 
    default: "No more employees"

}]).then(function(typeAnswers){
    if(typeAnswers.type === "Engineer"){
        inquirer.prompt([{

            type: "input", 
            message: "Name of engineer", 
            name: "name", 
            default: "Jim"
        }, 
        {
            type: "input", 
            message: "engineers ID ", 
            name: "id", 
            default: "1",
        },
        {
            type: "input", 
            message: "engineers email", 
            name: "email", 
            default: "@gmail.com"
        },
        {
            type: "input", 
            message: "engineers github", 
            name: "github", 
            default: "github.com"
        
            }]).then(function(engineerAnswers){
            const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
            employees.push(engineer);
            makeNewEmployees()
        });

    } else if (typeAnswers.type === "Intern"){
        inquirer.prompt([{
            type: "input", 
            message: "Name of intern", 
            name: "name", 
            default: "Jam"
        }, 
        {
            type: "input", 
            message: "interns ID ", 
            name: "id", 
            default: "1",
        },
        {
            type: "input", 
            message: "interns email", 
            name: "email", 
            default: "@gmail.com"
        },
        {
            type: "input", 
            message: "interns school", 
            name: "school", 
            default: "school"

                }]).then(function(internAnswers){
                const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
                employees.push(intern);
                makeNewEmployees()
         });

        
          } else {
            const html = render(employees); 
            fs.writeFileSync(outputPath, html, function(err){
                if (err)
                    throw err; 
                    console.log("working"); 
                });
            }
        
       
       });
       } 





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
