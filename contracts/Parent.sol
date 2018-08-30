pragma solidity ^0.4.24;

import "./ERC20.sol";

contract Parent {

    ERC20 private token;

    constructor (address erc20) public {
        token = ERC20(erc20);
    }

    function ERC20TotalSupply() external view returns(uint256) {
        return token.totalSupply();
    }

    function transferERC20(address to, uint256 value) public returns (bool) {
        //token.approve(this, value);
        token.transferFrom(msg.sender, to, value);

        return true;
    }
}