var BigNumber = require('bignumber.js');
var NFTGame = artifacts.require('NFTGame')
const truffleAssert = require('truffle-assertions');

contract('NFTGame', async function(accounts){
    
    var EXPECTED_TOKEN_Id = 1
    var speed = 5
    var fuel = 2    
    var lastRefuel = Math.floor(Date.now() / 1000);
    var range = Math.floor(Date.now() / 1000)+10;

    it("Mint a car see if it exists", async() => {
        const nftGame = await NFTGame.deployed();        
        var tokenId = BigNumber(await nftGame.tokenCounter()).toString();                

        await nftGame.mint(speed, fuel, lastRefuel, range)
        var tokenCounter = await nftGame.tokenCounter();
        
        truffleAssert.passes(tokenId === EXPECTED_TOKEN_Id, "Token Id should be 1");        
        truffleAssert.passes(tokenId > tokenCounter, "Token Id should be greater than 1 after minting");                
    });

    if("Retrieve speed of car that has been minted", async() => {
        const nftGame = await NFTGame.deployed();        
        const speedResp = await nftGame.getSpeed.call(EXPECTED_TOKEN_Id);                        
        truffleAssert.passes(speed, speedResp.toNumber(), "Speed should be equal");
    });

    it("Fetch Token Details for First Minted Car", async() => {
        const nftGame = await NFTGame.deployed();        
        const response = await nftGame.getCarDetails.call(EXPECTED_TOKEN_Id);        

        truffleAssert.passes(speed, response[0].toNumber(), "Speed should be equal");
        truffleAssert.passes(fuel, response[1].toNumber(), "Fuel should be equal");
        truffleAssert.passes(lastRefuel, response[2].toNumber(), "LastRefuel should be equal");
        truffleAssert.passes(range, response[3].toNumber(), "Range should be equal");        
    });

    it("Check that range increases and last refuel updates after calling refuel", async() => {
        const nftGame = await NFTGame.deployed();        
        const responseBefore = await nftGame.getCarDetails.call(EXPECTED_TOKEN_Id);        
        const lastRefuleBeforeRefueling = responseBefore[2].toNumber();
        const rangeBeforeFueling = responseBefore[3].toNumber();

        await nftGame.refuel(EXPECTED_TOKEN_Id);

        const responseAfter = await nftGame.getCarDetails.call(EXPECTED_TOKEN_Id);        
        const lastRefuleAfterRefueling = responseAfter[2].toNumber();
        const rangeAfterFueling = responseAfter[3].toNumber();
               
        truffleAssert.passes(lastRefuleBeforeRefueling < lastRefuleAfterRefueling, "LastRefuel After refueling should be greater than before");
        truffleAssert.passes(rangeBeforeFueling < rangeAfterFueling, "Range After refueling should be greater than before");     
    });
});