// Import the readline module for handling user input in the console
import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

//starter code
// rl.on('line', (line) => {
//     console.log(line);
// });

// rl.once('close', () => {
//      // end of input
//      console.log("Goodbye");
//  });

// rl.question('Enter name:', (name) => {
//     console.log(name);
// });

// here we will have the user input what they want to do 
// view list
// add grocery (name, quantity, price, bought (default false))
// remove grocery (name needed)
// set whether bought or not
// import { displayList } from "./grocery_list_func.js";
// import { addGrocery } from "./grocery_list_func.js";
// import { removeGrocery } from "./grocery_list_func.js";
// import { bought } from "./grocery_list_func.js";
// import { doneShopping } from "./grocery_list_func.js";

var groceryList = [];

function displayList(){
    if (groceryList.length == 0) {
        console.log("The grocery list is empty.\n");
        return;
    }

    console.log("Grocery List:");
    for(const elem of groceryList){
        console.log(elem);
    } 
}

function addGrocery(){
    rl.question ('Enter the grocery you want to add: ', (item) => {
        rl.question('Enter quantity: ', (quantity) => {
            rl.question('Enter price: ', (price) => {
                const grocery = {item, quantity, price, bought:false};
                groceryList.push(grocery);
                console.log("Grocery added!\n");
                showMenu();
            });
        });
    });
    
}

function removeGrocery(){
    rl.question("Enter name of grocery you want to remove: ", (item) => {
        const index = groceryList.findIndex(grocery => grocery.item === item);
        if (index !== -1) {
            groceryList.splice(index, 1);
            console.log(item + " removed.");
        } else {
            console.log(item + " not found in the list.\n");
        }
        showMenu();
    });
}

function bought(){
    rl.question("Enter name of grocery bought: ", (item) => {
      const index = groceryList.findIndex(grocery => grocery.item === item);
      if (index !== -1) {
        groceryList[index].bought = true;
        console.log(item + "bought!");
      }
      else {
        console.log(item + " not found in the list.\n");
      }
        showMenu();
    });
    
}

function doneShopping(){
    console.log("Shopping done!")
}


// main 
function showMenu(){
  rl.question('What would you like to do?\n1.View Grocery List\n2.Add Grocery\n3.Remove Grocery\n4.Set Grocery to Bought\n5.Exit\nSelect an option: ', 
    (choice) => {
        switch (choice){
          case '1' : 
            displayList();
            showMenu();
            break;
          case '2':
            addGrocery();
            showMenu();
            break;
          case '3':
            removeGrocery();
            showMenu();
            break;
          case '4':
            bought();
            showMenu();
            break;
          case '5':
            doneShopping();
            rl.close();
            break;
          default:
            console.log("Invalid choice. Please select a valid option.\n");
            showMenu();
        }
    });
}

showMenu();
