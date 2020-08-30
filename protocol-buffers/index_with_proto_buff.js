const Schema = require("./employees_pb")
const fs = require("fs");

const neeraj = new Schema.Employee();
neeraj.setId(1001);
neeraj.setName("Neeraj");
neeraj.setSalary(10000000);

const jitu = new Schema.Employee();
jitu.setId(1002);
jitu.setName("Jitu");
jitu.setSalary(1000000);

const sagar = new Schema.Employee();
sagar.setId(1003);
sagar.setName("Sagar");
sagar.setSalary(1000000);

const employees = new Schema.Employees();
employees.addEmployees(neeraj);
employees.addEmployees(jitu);
employees.addEmployees(sagar);

console.log("All Employees "+ employees);

const bytes = employees.serializeBinary();
console.log("Binary " +  bytes);

fs.writeFileSync("employeesBinary", bytes);


const employees2 = Schema.Employees.deserializeBinary(bytes);

console.log(" \n Deserialized Employees " + employees2.toString());