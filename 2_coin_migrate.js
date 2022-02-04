const Token = artifacts.require('./erc');

module.exports = function(deployer){
    deployer.deploy(MyToken)
}