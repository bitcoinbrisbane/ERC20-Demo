const Web3Utils = require('web3-utils');

const Token = artifacts.require('./Token.sol');

const accounts = web3.eth.accounts;
const owner = accounts[0];

module.exports = function(deployer, network) {
    return deployer
        .deploy(Token);
};