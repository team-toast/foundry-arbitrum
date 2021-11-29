// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract aFRY is ERC20, Ownable {
  constructor() ERC20("Arbitrum FRY", "aFRY") {}

  function mint(address recipient, uint256 amount) public onlyOwner {
    _mint(recipient, amount);
  }

  function burn(address recipient, uint256 amount) public {
    _burn(recipient, amount);
  }
}
