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
        uint256 refuel;
        uint256 currentRange;
    }

    mapping (uint256=>Car) private carDetails;
    uint256 tokenCounter=0;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {

    }    

    function mint(uint256 speed, uint256 fuel, uint256 refuel, uint range) 
        public onlyOwner
    {
        uint256 newid = tokenCounter;
        carDetails[newid] = Car(speed, fuel, refuel, range);
        _safeMint(msg.sender, newid);
        tokenCounter++;
    }
}