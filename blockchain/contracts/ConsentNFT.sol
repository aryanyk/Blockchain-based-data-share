// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConsentNFT {
    struct Consent {
        address user;
        string whatData;
        string whoCanAccess;
        uint256 validUntil;
        bool active;
    }

    uint256 public consentCounter;
    mapping(uint256 => Consent) public consents;

    event ConsentMinted(uint256 id, address user, string whatData, string whoCanAccess, uint256 validUntil);
    event ConsentRevoked(uint256 id);

    constructor() {
        consentCounter = 0;
    }

    function mintConsent(string memory _whatData, string memory _whoCanAccess, uint256 _validUntil) public returns (uint256) {
        consentCounter++;
        consents[consentCounter] = Consent(msg.sender, _whatData, _whoCanAccess, _validUntil, true);
        emit ConsentMinted(consentCounter, msg.sender, _whatData, _whoCanAccess, _validUntil);
        return consentCounter;
    }

    function revokeConsent(uint256 id) public {
        require(consents[id].user == msg.sender, "Not the owner");
        require(consents[id].active, "Already revoked");
        consents[id].active = false;
        emit ConsentRevoked(id);
    }

    function isValid(uint256 id, string memory requester) public view returns (bool) {
        Consent memory c = consents[id];
        return (c.active && keccak256(abi.encodePacked(c.whoCanAccess)) == keccak256(abi.encodePacked(requester)) && block.timestamp < c.validUntil);
    }
}
