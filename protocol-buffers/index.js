const employees = [];
const fs = require("fs");
const neeraj = {
    "name": "Neeraj",
    "salary": "1000000",
    "id": 1001
};

const jitu = {
    "name": "Jitu",
    "salary": "1000000",
    "id": 1002
};

const sagar = {
    "name": "Sagar",
    "salary": "1000000",
    "id": 1003
};

employees.push(neeraj);
employees.push(jitu);
employees.push(sagar);

console.log(JSON.stringify(employees));
fs.writeFileSync("jsondata.json",JSON.stringify(employees));