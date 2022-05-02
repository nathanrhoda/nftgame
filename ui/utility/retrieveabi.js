const fs = require ('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question(`Please enter full path including contract name:`, name =>{
    const contract = JSON.parse(fs.readFileSync(name, 'utf8'));
    console.log(JSON.stringify(contract.abi));
    readline.close();
})