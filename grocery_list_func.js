// // Import the readline module for handling user input in the console
// import readline from 'node:readline';
// const rl = readline.createInterface({
//   input: process.stdin, // Read from standard input (keyboard)
//   output: process.stdout // Write to standard output (console)
// });

// let groceryList = [];

// export function displayList(){
//     if (groceryList.length == 0) {
//         console.log("The grocery list is empty.");
//         return;
//     }

//     console.log("Grocery List:");
//     for(const elem of groceryList){
//         console.log(elem);
//     } 
// }

// export function addGrocery(){
//     rl.question ('Enter the grocery you want to add: ', (item) => {
//         rl.question('Enter quantity: ', (quantity) => {
//             rl.question('Enter price: ', (price) => {
//                 const grocery = {item, quantity, price, bought:false};
//                 groceryList.push(grocery);
//                 console.log("Grocery added!");
//                 //showMenu();
//             });
//         });
//     });
    
// }

// export function removeGrocery(){
//     rl.question("Enter name of grocery you want to remove: ", (item) => {
//         const index = groceryList.findIndex(grocery => grocery.item === item);
//         if (index !== -1) {
//             groceryList.splice(index, 1);
//             console.log(item + " removed.");
//         } else {
//             console.log(item + " not found in the list.");
//         }
//         //showMenu();
//     });
// }

// export function bought(){
//     rl.question("Enter name of grocery bought: ", (item) => {
//       const index = groceryList.findIndex(grocery => grocery.item === item);
//       if (index !== -1) {
//         groceryList[index].bought = true;
//         console.log(item + "bought!");
//       }
//       else {
//         console.log(item + " not found in the list.");
//       }
//         //showMenu();
//     });
    
// }

// export function doneShopping(){
//     console.log("Shopping done!")
// }
