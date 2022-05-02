// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTGame is ERC721URIStorage, Ownable
{
    struct Car
    {
        uint256 fuel;
        string brand;
        uint256 speed;
    }

    mapping (uint256=>Car) private carDetails;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {

    }    
}