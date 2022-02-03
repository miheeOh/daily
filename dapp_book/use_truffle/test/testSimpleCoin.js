const SimpleCoin = artifacts.require(
    "./SimpleCoin.sol"
)

contract('SimpleCoin', function(accounts) {
    contract('SimpleCoin.Constructor',
    function(accounts) {
        it("Contract owner is sender",
        function(){
            return SimpleCoin.deployed()
            .then(function(instance){
                return instance.owner();
            })
            .then(function(contractOwner){
                assert.equal(contractOwner.valueOf(),
                accounts[0],
                "accounts[0] wasn's the contract owner");
            })
        })
        it("Contract owner balance is equal to initialSupply", function(){
            return SimpleCoin.deployed()
            .then(function(instance) {
                return instance.coinBalance(accounts[0]);
            }).then(function(contractOwnerBalance){
                assert.equal(contractOwnerBalance.valueOf(),
                10000,
                "the contract owner balance is not equal to the full supply of 10000")
            });
        });
    }
    )
})