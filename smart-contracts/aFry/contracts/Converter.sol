pragma solidity ^0.5.0;
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./aFry.sol";
import "./Fry.sol";

contract Converter
{
    using SafeMath for uint256;
    FRY public fryInstance;
    aFRY public aFryInstance;
    uint sellEnabled;
    address owner;

    constructor(FRY _fryInstance, aFRY _gFryInstance) 
        public 
    {
        fryInstance = _fryInstance;
        aFryInstance = _gFryInstance;
    }

    function wrap(uint _amount)
        external 
    {
        require(fryInstance.balanceOf(msg.sender) >= _amount, "User aFRY balance too low");

        bool fryTransferSuccess = fryInstance.transferFrom(msg.sender, address(this), _amount);
        require(fryTransferSuccess, "FRY receive failed");

        bool aFryMintSuccess = aFryInstance.mint(msg.sender, _amount);
        require(aFryMintSuccess, "Mint failed");
    }

    function unwrap(uint _amount)
        external 
    {
        require(fryInstance.balanceOf(address(this)) >= _amount, "Contract FRY balance too low");

        bool aFryTransferSuccess = aFryInstance.transferFrom(msg.sender, address(this), _amount);
        require(aFryTransferSuccess, "aFRY receive failed");

        aFryInstance.burn(_amount);

        bool fryTransferSuccess = fryInstance.transfer(msg.sender, _amount);
        require(fryTransferSuccess, "FRY Transfer failed");
    }

}