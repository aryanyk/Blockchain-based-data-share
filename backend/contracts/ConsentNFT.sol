
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ConsentNFT is ERC721 {
    struct Consent { string dataScope; uint expiry; }
    mapping(uint => Consent) public consents;

    constructor() ERC721("ConsentNFT", "CNFT") {}

    function mint(address user, string memory dataScope, uint expiry) public {
        uint tokenId = totalSupply() + 1;
        _mint(user, tokenId);
        consents[tokenId] = Consent(dataScope, expiry);
    }
}