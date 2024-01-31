import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { Voting } from "../../typechain-types"
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")

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
          id: "1",
          voteCount: 0,
        },

        {
          name: "hari",
          image: "hjfhtyertxfgcxvdsf",
          party: "amale",
          id: "2",
          voteCount: 0,
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

      // setMayorCandidates
      describe("setMayorCandidates", () => {
        it("reverts if it is not called by the owner", async () => {
          await expect(
            vote.connect(player).setMayorCandidates(candidates)
          ).to.be.revertedWithCustomError(vote, "Voting__NotOwner")
        })

        it("reverts if there is no candidate", async () => {
          await expect(vote.setMayorCandidates([])).to.be.revertedWithCustomError(
            vote,
            "Voting_CandidatesRequired"
          )
        })

        it("sets the candidates and emits the event", async () => {
          await expect(await vote.setMayorCandidates(candidates)).to.emit(vote, "CandidatesAdded")
        })
      })

      // voteMayor
      describe("voteMayor", () => {
        beforeEach(async () => {
          await vote.setMayorCandidates(candidates)
        })

        it("reverts if voter tries to vote 2 times", async () => {
          await vote.voteMayor("1")
          await vote.connect(player).voteMayor("1")

          await expect(vote.voteMayor("2")).to.be.revertedWithCustomError(
            vote,
            "Voting__AlreadyVoted"
          )
        })

        it("updates the voters structure and candidates vote count", async () => {
          await vote.voteMayor("1")
          await vote.connect(player).voteMayor("2")
          await vote.connect(player3).voteMayor("2")

          // const res = await (await vote.connect(player3).voteMayor("2")).wait(1)
          // const voteCount = await (res?.logs[0] as EventLog).args.voteCount
          // console.log(Number(voteCount), "requestId")

          assert.equal(await vote.isVoted(deployer?.address), true)
          assert.equal(await vote.isVoted(player?.address), true)
          assert.equal(await vote.isVoted(player2?.address), false)

          assert.equal(Number((await vote.getMayorCandidateById("1")).voteCount), 1)
          assert.equal(Number((await vote.getMayorCandidateById("2")).voteCount), 2)
        })

        it("emits an event when someone votes", async () => {
          await expect(vote.voteMayor("1"))
            .to.emit(vote, "VotedSuccessfully")
            .withArgs(anyValue, anyValue)
        })
      })

      // getAllMayors
      describe("getAllMayors", () => {
        beforeEach(async () => {
          await vote.setMayorCandidates(candidates)
        })

        it("gives all mayors", async () => {
          const length = await vote.getCandidatesId()
          console.log(length, "LE")
          const all = []

          for (let i = 0; i < length.length; i++) {
            all.push(await vote.getMayorCandidateById(length?.[i]))
          }
          console.log(all, "all")
        })
      })

      // describe("getWinner", () => {
      //   beforeEach(async () => {
      //     await vote.setMayorCandidates(""2"080", candidates)
      //   })

      //   it("returns the array of candidates and their vote", async () => {
      //     await vote.voteMayor("1")
      //     await vote.connect(player).voteMayor("2")
      //     await vote.connect(player"2").voteMayor("2")
      //     await vote.connect(player3).voteMayor("1")
      //     await vote.connect(player4).voteMayor("2")

      //     await vote.getWinner()
      //     const candidates = await vote.pickWinner()
      //     console.log(candidates, "candi")

      //     let large=0;
      //     for(let i=0; i<candidates.length;i++){
      //       if(large > candidates[i].)
      //     }
      //     assert.equal(candidates.length, "2")
      //   })
      // })
    })
