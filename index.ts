
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";

// customer class
class customer{
    firstName:string
    lastName:string
    age:number
    gender:string
    mobNumber:number
    accNumber:number
    constructor(fName:string, 
        lName:string, 
        age:number,
        gender:string,
        mob:number,
        acc:number)
    {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
       this. mobNumber = mob;
        this.accNumber = acc
    }
}
// inteface Bankaccount
interface bankaccount{
    accnumber : number,
    balance : number,
}
// class bank
class Bank{
    customer : customer[] = [];
    account : bankaccount[] = [];
    addcustomer(object:customer){
        this.customer.push(object);
    }
    addAccountNumber(object:bankaccount){
this.account.push(object);
    }
    transaction(accobj:bankaccount){
        let newacount = this.account . filter((acc) => acc.accnumber !== accobj.accnumber);
        this.account = [...newacount, accobj];
            }
}

let myBank = new Bank();
// customer create
for(let i:number=1; i<=50; i++ ){
let fName = faker.person.firstName()
let lName = faker.person.lastName()
let num = parseInt(faker.phone.number('03#########'))
const cus = new customer(fName,lName,11+i, "female",num,1000+i)
myBank.addcustomer(cus);
myBank.addAccountNumber({accnumber: cus.accNumber , balance:1000*i})
}


// Bank functionality:
async function bankservice(Bank:Bank) {
    let service = await inquirer.prompt({
        name:"select",
        type: "list",
        message: "Please select the service",
        choices:[ " View Balance", "Cash Withdraw", " Cash Deposite"]
    })
    // view balance:
    if(service.select === " View Balance" ){
        let res = await inquirer.prompt({
            name: "num",
            type: "input",
            message: "Please enter your Account Number"
        })
        let account = myBank.account.find((acc)=>acc.accnumber == res.num)
        if(!account){
            console.log(chalk.italic.bold.red("invalid account number"))
        }
        if(account){
            let name = myBank.customer.find((item)=> item.accNumber === account?.accnumber);
            console.log( `Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)}
            your Account Balance is ${chalk.blue.italic(`$${account.balance}`)}`)
        }
    }
    // cash withdraw:
    if(service.select === "Cash Withdraw" ){
        let res = await inquirer.prompt({
            name: "num",
            type: "input",
            message: "Please enter your Account Number"
        })
        let account = myBank.account.find((acc)=>acc.accnumber == res.num)
        if(!account){
            console.log(chalk.italic.bold.red("invalid account number"))
        }
        if(account){
            let ans = await inquirer.prompt({
                name: "rupee",
                type: "number",
                message: "Please enter your Amountr"
            });
            let newbalance = account.balance - ans.rupee
            // transaction method:
Bank.transaction({
    accnumber:account.accnumber, balance:newbalance
});
console.log(newbalance)

        }
    }
    
    // cash deposite:
    if(service.select === " Cash Deposite" ){
        let res = await inquirer.prompt({
            name: "num",
            type: "input",
            message: "Please enter your Account Number"
        })
        let account = myBank.account.find((acc)=>acc.accnumber == res.num)
        if(!account){
            console.log(chalk.italic.bold.red("invalid account number"))
        }
        if(account){
            let ans = await inquirer.prompt({
                name: "rupee",
                type: "number",
                message: "Please enter your Amountr"
            });
            let newbalance = account.balance + ans.rupee
            // transaction method:
Bank.transaction({
    accnumber:account.accnumber, balance:newbalance
});
console.log(newbalance)
        }
    }
}
bankservice(myBank);