const MAX_AMOUNT = 100;

class VendingMachine {
  constructor(inventory) {
    this.money = 0;
    this.change = 0;
    this.coinChange = [];
    this.choice = null;
    this.choiceIndex = null;
    this.inventory = inventory;
  }

  resetInventory() {
    this.inventory = {};
  }

  //Print the inventory of the machine
  printInventory() {
    let returnString = "";
    for (let i = 0; i < this.inventory.length; i++) {
      returnString +=
        this.inventory[i].name +
        ": $" +
        this.inventory[i].price +
        " Stock: " +
        this.inventory[i].amount +
        " ";
    }
    return returnString;
  }

  //Put money in the machine
  insertMoney(insertedMoney) {
    this.money += insertedMoney;
  }

  makeChoice(input) {
    if (typeof input === "number") {
      for (let j = 0; j < this.inventory.length; j++) {
        if (this.inventory[j].id === input) {
          this.choice = this.inventory[j];
          this.choiceIndex = j;
        }
      }
    } else if (typeof input === "string") {
      for (let j = 0; j < this.inventory.length; j++) {
        if (this.inventory[j].name === input) {
          this.choice = this.inventory[j];
          this.choiceIndex = j;
        }
      }
    }
    if (this.choice === null) {
      console.error("Not valid input");
    } else {
      return this.choice;
    }
  }

  //Check stock of product
  hasStock(selection) {
    if (selection.amount > 0) {
      return true;
    } else {
      console.error("This machine does not have that in stock");
      return false;
    }
  }

  //Check if user has input enough money
  enoughMoney() {
    if (this.money >= this.choice.price) {
      return true;
    } else {
      console.error("Not enough money");
      return false;
    }
  }

  //Buy drink based on selection (number)
  buyDrink(selection) {
    this.choice = this.makeChoice(selection); //Assigns choice if valid
    if (this.hasStock(this.choice) && this.enoughMoney()) {
      this.inventory[this.choiceIndex].amount -= 1;
      this.change = (this.money * 100 - this.choice.price * 100) / 100;
      this.money = (this.money * 100 - this.choice.price * 100) / 100;
    }
    this.change = this.money;
    this.money = 0;

    if (this.change > 0) {
      console.log(this.returnMinCoins(this.change));
    }
  }

  //Return Minimum coins change
  returnMinCoins(moneyAmount) {
    let coins = [2, 1, 0.25, 0.1, 0.05];
    this.coinChange = [0, 0, 0, 0, 0];
    for (let i = 0; i < coins.length; i++) {
      this.coinChange[i] = Math.floor(moneyAmount / coins[i]);
      moneyAmount -= coins[i] * this.coinChange[i];
    }
    return (
      "   $2: " +
      this.coinChange[0] +
      "\n   $1: " +
      this.coinChange[1] +
      "\n$0.25: " +
      this.coinChange[2] +
      "\n$0.10: " +
      this.coinChange[3] +
      "\n$0.05: " +
      this.coinChange[4]
    );
  }

  //Restock a specified product
  restockSpecific(product) {
    this.makeChoice(product);
    this.inventory[this.choiceIndex].amount = MAX_AMOUNT;
  }

  //Fully restock the vending machine
  restockAll() {
    for (let i = 0; i < this.inventory.length; i++) {
      this.inventory[i].amount = MAX_AMOUNT;
    }
  }
}

module.exports = VendingMachine;
