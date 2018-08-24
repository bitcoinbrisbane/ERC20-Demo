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
    const actual = await this.parent.transferERC20();
  });

  it("should transfer from child contract", async function () {
    const actual = await this.parent.ERC20TotalSupply();
    assert.equal(actual.valueOf(), 100000000, "Total supply should be 100000000");
  });
});