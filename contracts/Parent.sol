pragma solidity ^0.4.24;

import "./ERC20.sol";

contract Parent {

    ERC20 private token;

    constructor (address erc20) public {
        token = ERC20(erc20);
    }

    function ERC20TotalSupply() public view returns(uint256) {
        return token.totalSupply();
    }

    function transferERC20(address to, uint256 value) public returns (bool) {
        token.transfer(to, value);

        return true;
    }
}