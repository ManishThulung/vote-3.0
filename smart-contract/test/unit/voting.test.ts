import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { Voting } from "../../typechain-types"

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Unit Test", function () {
      let player: SignerWithAddress
      let player2: SignerWithAddress
      let player3: SignerWithAddress
      let player4: SignerWithAddress
      let deployer: SignerWithAddress
      let accounts: SignerWithAddress[]
      let vote: Voting

      const chainId: number | undefined = network.config.chainId
      const candidates = [
        {
          name: "Ram",
          image: "dajsfl;k",
          party: "independent",
          region: "1",
        },

        {
          name: "hari",
          image: "hjfhtyertxfgcxvdsf",
          party: "amale",
          region: "1",
        },
      ]

      beforeEach(async function () {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        player = accounts[1]
        player2 = accounts[2]
        player3 = accounts[3]
        player4 = accounts[4]

        vote = await ethers.deployContract("Voting")
        await vote.waitForDeployment()
      })

      it("sets the right deployer", async () => {
        assert.equal(await vote.getOwner(), deployer.address)
      })

      describe("setCandidates", () => {
        it("reverts if it is not called by the owner", async () => {
          await expect(
            vote.connect(player).setCandidates("2080", [])
          ).to.be.revertedWithCustomError(vote, "Voting__NotOwner")
        })

        it("reverts if there is no candidate", async () => {
          await expect(vote.setCandidates("2080", [])).to.be.revertedWithCustomError(
            vote,
            "Voting_CandidatesRequired"
          )
        })

        it("sets the candidates and emits the event", async () => {
          await expect(await vote.setCandidates("2080", candidates))
            .to.emit(vote, "CandidatesAdded")
            .withArgs("2080")
        })
      })

      describe("voteCandidate", () => {
        beforeEach(async () => {
          await vote.setCandidates("2080", candidates)
        })

        it("reverts if voter tries to vote 2 times", async () => {
          await vote.voteCandidate(1)
          await vote.connect(player).voteCandidate(1)

          await expect(vote.voteCandidate(2)).to.be.revertedWithCustomError(
            vote,
            "Voting__AlreadyVoted"
          )
        })

        it("updates the voters array and candidates vote count", async () => {
          await vote.voteCandidate(1)
          await vote.connect(player).voteCandidate(2)

          const voters = await vote.getVoters()
          assert.equal(voters[0], deployer?.address)
          assert.equal(voters[1], player?.address)

          assert.equal(Number(await vote.getVotesByCandidateId(1)), 1)
          assert.equal(Number(await vote.getVotesByCandidateId(2)), 1)
        })

        it("emits an event when someone votes", async () => {
          await expect(vote.voteCandidate(1)).to.emit(vote, "VoteSuccessfully").withArgs(1)
        })
      })

      // describe("getWinner", () => {
      //   beforeEach(async () => {
      //     await vote.setCandidates("2080", candidates)
      //   })

      //   it("returns the array of candidates and their vote", async () => {
      //     await vote.voteCandidate(1)
      //     await vote.connect(player).voteCandidate(2)
      //     await vote.connect(player2).voteCandidate(2)
      //     await vote.connect(player3).voteCandidate(1)
      //     await vote.connect(player4).voteCandidate(2)

      //     await vote.getWinner()
      //     const candidates = await vote.pickWinner()
      //     console.log(candidates, "candi")

      //     let large=0;
      //     for(let i=0; i<candidates.length;i++){
      //       if(large > candidates[i].)
      //     }
      //     assert.equal(candidates.length, 2)
      //   })
      // })
    })
