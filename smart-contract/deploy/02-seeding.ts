import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

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
const deployVoting: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const chainId = await ethers.provider.getNetwork()
  console.log(chainId, "id")

  const vote = await ethers.getContractAt("Voting", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
  console.log(vote, "vote")

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]

  console.log(deployer, "deployer")

  const addMayor = await vote.setMayorCandidates(candidates)
  console.log(addMayor, "addma")
}

export default deployVoting
deployVoting.tags = ["seed", "main"]
