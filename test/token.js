const Token = artifacts.require("Token");

contract("Token", function(accounts) {
  beforeEach(async function () {
      this.token = await Token.new({from: accounts[0]});
  });

  it("should test ERC20 public properties", async function () {
    const name = await this.token.name();
    assert.equal(name, "Token", "Name should be Token");

    const symbol = await this.token.symbol();
    assert.equal(symbol, "TOKEN", "Symbol should be TOKEN");
  });

  it("total supply should be 100000000", async function () {
    const actual = await this.token.totalSupply();
    assert.equal(actual.valueOf(), 100000000, "Total supply should be 100000000");
  });

  it("owner balance should be 100000000", async function () {
    const actual = await this.token.balanceOf(accounts[0]);
    assert.equal(actual.valueOf(), 100000000, "Balance should be 100000000");
  });

  it("should transfer 1337 tokens", async function () {
    await this.token.transfer(accounts[1], 1337);
    var actual = await this.token.balanceOf(accounts[0]);
    assert.equal(actual.valueOf(), 99998663, "Balance should be 99998663");

    actual = await this.token.balanceOf(accounts[1]);
    assert.equal(actual.valueOf(), 1337, "Balance should be 1337");
  });

  it("should transfer 100 tokens from account 1", async function () {
    await this.token.transfer(accounts[1], 100);

    var actual = await this.token.balanceOf(accounts[1]);
    assert.equal(actual.valueOf(), 100, "Balance of account 1 should be 100");

    actual = await this.token.balanceOf(accounts[2]);
    assert.equal(actual.valueOf(), 0, "Balance of account 2 should be 0");

    //to account 2 from account 1
    await this.token.transfer(accounts[2], 10, {from: accounts[1]});

    actual = await this.token.balanceOf(accounts[1]);
    assert.equal(actual.valueOf(), 90, "Balance of account 1 should be 90");

    actual = await this.token.balanceOf(accounts[2]);
    assert.equal(actual.valueOf(), 10, "Balance of account 2 should be 10");
  });

  it("owner should allow alice to transfer 100 tokens to bob from owner", async function () {
    //account 0 (owner) approves alice
    const owner = accounts[0];
    const bob = accounts[1];
    const alice = accounts[2];
    await this.token.approve(alice, 100);
    
    //account 0 (owner) now transfers from alice to bob
    await this.token.transferFrom(owner, bob, 100, {from: alice});
    var actual = await this.token.balanceOf(bob);
    assert.equal(actual.valueOf(), 100, "Balance should be 100");
  });
});