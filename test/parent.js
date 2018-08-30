const Token = artifacts.require("Token");
const Parent = artifacts.require("Parent");
  
contract("Parent", function(accounts) {
  beforeEach(async function () {
      this.token = await Token.new({from: accounts[0]});

      const address = this.token.address;

      console.log("Token contract address ", address);

      this.parent = await Parent.new(address, {from: accounts[0]});
  });

  it("should get total supply from child contract", async function () {
    const actual = await this.parent.ERC20TotalSupply();
    assert.equal(actual.valueOf(), 100000000, "Total supply should be 100000000");
  });

  // it("should transfer from child contract to account 1", async function () {
  //   var actual = await this.token.balanceOf(accounts[0]);
  //   assert.equal(actual.valueOf(), 100000000, "Account 0 balance should be 100000000");

  //   actual = await this.token.balanceOf(accounts[1]);
  //   assert.equal(actual.valueOf(), 0, "Account 1 balance should be 0");

  //   await this.parent.transferERC20(accounts[1], 1);
  //   actual = await this.token.balanceOf(accounts[1]);
  //   assert.equal(actual.valueOf(), 1, "Account 1 balance should be 1");
  // });

  it("should transfer from child contract to account 1", async function () {
    //setup
    var actual = await this.token.balanceOf(accounts[0]);
    assert.equal(actual.valueOf(), 100000000, "Account 0 balance should be 100000000");

    actual = await this.token.balanceOf(accounts[1]);
    assert.equal(actual.valueOf(), 0, "Account 1 balance should be 0");

    // await this.parent.transferERC20(accounts[1], 10);
    // actual = await this.token.balanceOf(accounts[1]);
    // assert.equal(actual.valueOf(), 10, "Account 1 balance should be 10");

    //appprove the smart contract to send on behalf of account 1
    await this.token.approve(this.parent.address, 10, {from: accounts[1]});

    var allowance = await this.token.allowance(accounts[1], this.parent.address);
    console.log(allowance);

    //back to account 0 from account 1
    await this.parent.transferERC20(accounts[0], 1, { from: accounts[1]});
    actual = await this.token.balanceOf(accounts[1]);
    assert.equal(actual.valueOf(), 9, "Account 1 balance should be 9");
  });
});