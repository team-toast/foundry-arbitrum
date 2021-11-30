// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/GSN/Context.sol";

contract aFRY is Context, ERC20Detailed, ERC20Mintable, ERC20Burnable 
{
  using SafeMath for uint;

  constructor() 
    public 
    ERC20Detailed("Arbitrum FRY", "aFRY", 18) 
  {}
}
