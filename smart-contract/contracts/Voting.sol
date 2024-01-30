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
  struct Candidate {
    string id;
    string name;
    string image;
    string party;
    int16 voteCount;
  }
  address private immutable i_owner;
  string private constant MAYOR = "Mayor";
  string private constant DEPUTY_MAYOR = "DeputyMayor";
  string private constant WARD_CHAIRMAN = "WardChairman";
  string private constant WARD_MEMBER = "WardMember";

  mapping(address => bool) s_voters;
  mapping(string => mapping(string => Candidate)) s_postToIdToCandidate;

  /** Events */
  event CandidatesAdded();
  event VotedSuccessfully(Candidate indexed canidate);

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

  ////////////////////////
  ///// MAIN FUNCTIONS////
  ////////////////////////

  function setMayorCandidates(Candidate[] memory _candidates) public onlyOwner(msg.sender) {
    if (_candidates.length < 1) {
      revert Voting_CandidatesRequired();
    }
    for (uint i = 0; i < _candidates.length; i++) {
      s_postToIdToCandidate[MAYOR][_candidates[i].id] = _candidates[i];
    }
    emit CandidatesAdded();
  }

  function voteMayor(string memory _mayorId) public alreadyVoted(msg.sender) {
    s_postToIdToCandidate[MAYOR][_mayorId].voteCount += 1;
    s_voters[msg.sender] = true;

    emit VotedSuccessfully(s_postToIdToCandidate[MAYOR][_mayorId]);
  }

  // function pickMayorWinner(string[] memory _mayorId) public {
  //   Candidate[] memory candidates;
  //   for (uint256 i = 0; i < _mayorId.length; i++) {
  //     candidates.push(s_postToIdToCandidate[MAYOR][_mayorId[i]]);
  //   }
  // }

  ///////////////////////
  //// GET FUNCTIONS/////
  ///////////////////////
  // function getMayorCandidates() public view returns (Candidate memory) {
  //   return s_postToIdToCandidate[MAYOR];
  // }
}
