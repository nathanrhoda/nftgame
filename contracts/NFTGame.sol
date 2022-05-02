// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTGame is ERC721URIStorage, Ownable
{
    struct Car
    {        
        uint256 speed;
        uint256 fuel;        
        uint256 lastRefuel;
        uint256 currentRange;
    }

    mapping (uint256=>Car) private carDetails;
    uint256 public tokenCounter=1;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {

    }    

    function mint(uint256 speed, uint256 fuel, uint256 lastRefuel, uint256 range) 
        public onlyOwner
    {
        uint256 newid = tokenCounter;
        carDetails[newid] = Car(speed, fuel, lastRefuel, range);
        _safeMint(msg.sender, newid);
        tokenCounter++;
    }

    function refuel(uint256 tokenId) public
    {
        Car storage car = carDetails[tokenId];
        require(car.lastRefuel+car.fuel>block.timestamp);
        car.lastRefuel=block.timestamp;
    }

    function getSpeed(uint256 tokenId) 
        public view
        returns (
                    uint256 speed
                )
    {
        return carDetails[tokenId].speed;
    }

    function getCarDetails(uint256 tokenId) 
        public view
        returns (
                    uint256 speed, 
                    uint256 fuel, 
                    uint256 lastrefuel, 
                    uint256 currentRange
                )
    {                
        return (             
                    carDetails[tokenId].speed,
                    carDetails[tokenId].fuel,
                    carDetails[tokenId].lastRefuel,
                    carDetails[tokenId].currentRange
               );
    }
}