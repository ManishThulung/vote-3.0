/**
 * Pragma statements
 * Import statements
 * Events
 * Errors
 * Interfaces
 * Libraries
 * Contracts
 *
 * inside contracts pattern
 * Type declarations
 * State variables
 * Events
 * Errors
 * Modifiers
 * Functions
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
  uint private storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
