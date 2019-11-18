const VendingMachine = require("../lib/vendingMachine.js");
let { items } = require("../inventory.json");
let vM;
describe("VendingMachine", () => {
  beforeEach(() => {
    vM = new VendingMachine(items);
    vM.restockAll();
  });
  describe("Insert a $1", () => {
    it("Money should be 1", () => {
      vM.insertMoney(1.0);
      expect(vM.money).toEqual(1.0);
    });
  });
  describe("Insert a $1, buy a coke", () => {
    it("Money should be 0, amount of cokes should be 1 less", () => {
      vM.insertMoney(1.0);
      vM.buyDrink("Coke");
      expect(vM.money).toEqual(0.0);
      expect(vM.inventory[0].amount).toEqual(99);
    });
  });
  describe("Insert a $1, buy a via id", () => {
    it("Money should be 0, amount of cokes should be 1 less", () => {
      vM.insertMoney(1);
      vM.buyDrink(0);
      expect(vM.money).toEqual(0);
      expect(vM.inventory[0].amount).toEqual(99);
    });
  });
  describe("Insert $101, try to buy more stock than the machine has", () => {
    it("Money should be 0, change should be 1", () => {
      for (let i = 0; i < 101; i++) {
        vM.insertMoney(1);
        vM.buyDrink("Pepsi");
      }
      expect(vM.money).toEqual(0);
      expect(vM.change).toEqual(1);
    });
  });
  describe("Insert a $1.05, buy coke, get 0.05", () => {
    it("Money should be 1.05, change should be 0.05", () => {
      vM.insertMoney(1.05);
      vM.buyDrink("Coke");
      expect(vM.money).toEqual(0);
      expect(vM.change).toEqual(0.05);
    });
  });
  describe("Print Inventory", () => {
    it("Inventory should be printed", () => {
      expect(vM.printInventory()).toEqual(
        `Coke: $1 Stock: 100 Sprite: $1 Stock: 100 Pepsi: $1 Stock: 100 Root Beer: $1 Stock: 100 Orange Crush: $1 Stock: 100 `
      );
    });
  });
  describe("Print Inventory after buying a coke", () => {
    it("Inventory should be printed with coke amount 1 less", () => {
      vM.insertMoney(1);
      vM.buyDrink(0);
      expect(vM.printInventory()).toEqual(
        `Coke: $1 Stock: 99 Sprite: $1 Stock: 100 Pepsi: $1 Stock: 100 Root Beer: $1 Stock: 100 Orange Crush: $1 Stock: 100 `
      );
    });
  });
  describe("Make a choice of id 3", () => {
    it("The name of id 3 should be Root Beer", () => {
      expect(vM.makeChoice(3).name).toEqual("Root Beer");
    });
  });
  describe("Restock Pepsi to max amount", () => {
    it("The amount of pepsi should increase from 0 to 100", () => {
      vM.insertMoney(1);
      vM.buyDrink(0);
      expect(vM.makeChoice(0).amount).toEqual(99);
      vM.restockSpecific(0);
      expect(vM.makeChoice(2).amount).toEqual(100);
    });
  });
  describe("Restock All to max amount", () => {
    it("The amount of all products should increase from to 100", () => {
      vM.restockAll();
      expect(vM.makeChoice(0).amount).toEqual(100);
      expect(vM.makeChoice(1).amount).toEqual(100);
      expect(vM.makeChoice(2).amount).toEqual(100);
      expect(vM.makeChoice(3).amount).toEqual(100);
    });
  });
  describe("Get change back with minimum coins", () => {
    it("Coin change should equal [3,1,2,1, 1]", () => {
      vM.insertMoney(8.65);
      vM.buyDrink(0);
      expect(vM.coinChange[0]).toEqual(3);
      expect(vM.coinChange[1]).toEqual(1);
      expect(vM.coinChange[2]).toEqual(2);
      expect(vM.coinChange[3]).toEqual(1);
      expect(vM.coinChange[4]).toEqual(1);
    });
  });
});
