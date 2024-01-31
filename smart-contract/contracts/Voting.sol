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

  mapping(address => bool) private s_voters;
  mapping(string => mapping(string => Candidate)) private s_postToIdToCandidates;
  mapping(string => string[]) private s_postToCandidatesId;

  /** Events */
  event CandidatesAdded();
  event VotedSuccessfully(string indexed id, int16 indexed voteCount);

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
      s_postToIdToCandidates[MAYOR][_candidates[i].id] = _candidates[i];
      s_postToCandidatesId[MAYOR].push(_candidates[i].id);
    }
    emit CandidatesAdded();
  }

  function voteMayor(string memory _id) public alreadyVoted(msg.sender) {
    int16 voteCount = s_postToIdToCandidates[MAYOR][_id].voteCount += 1;

    s_voters[msg.sender] = true;

    emit VotedSuccessfully(_id, voteCount);
  }

  // function pickMayorWinner(string[] memory _id) public {
  //   Candidate[] memory candidates;
  //   for (uint256 i = 0; i < _id.length; i++) {
  //     candidates.push(s_postToIdToCandidates[MAYOR][_id[i]]);
  //   }
  // }

  ///////////////////////
  //// GET FUNCTIONS/////
  ///////////////////////

  function getMayorCandidateById(string memory _id) public view returns (Candidate memory) {
    return s_postToIdToCandidates[MAYOR][_id];
  }

  function getOwner() public view returns (address) {
    return i_owner;
  }

  function isVoted(address user) public view returns (bool) {
    return s_voters[user];
  }

  function getCandidatesId() public view returns (string[] memory) {
    return s_postToCandidatesId[MAYOR];
  }
}
