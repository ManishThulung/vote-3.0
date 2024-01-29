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

error Voting__NotOwner();
error Voting_CandidatesRequired();
error Voting__AlreadyVoted();

contract Voting {
  struct CandidateDescription {
    string name;
    string image;
    string party;
    string voteCount;
  }
  address private immutable i_owner;

  mapping(address => bool) s_voters;

  modifier onlyOwner(address user) {
    if (user != i_owner) {
      revert Voting__NotOwner();
    }
    _;
  }
  modifier alreadyVoted(address user) {
    if (s_voters[user] == true) {
      revert Voting__AlreadyVoted();
    }
    _;
  }

  constructor() {
    i_owner = msg.sender;
  }
}
