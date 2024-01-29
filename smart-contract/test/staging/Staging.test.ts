// import { assert, expect } from "chai"
// import { network, deployments, ethers, getNamedAccounts } from "hardhat"
// import { developmentChains, networkConfig } from "../../helper-hardhat-config"
// import { CrowdFunding } from "../../typechain-types"
// import { Addressable } from "ethers"

// developmentChains.includes(network.name)
//   ? describe.skip
//   : describe("Staging Test", function () {
//       let crowdFund: CrowdFunding
//       let deployer: string | Addressable
//       const chainId: number | undefined = network?.config?.chainId

//       beforeEach(async function () {
//         const args: any[] = [networkConfig[chainId].priceFeed]

//         deployer = (await getNamedAccounts()).deployer

//         crowdFund = await ethers.deployContract("CrowdFunding", args)

//         await crowdFund.waitForDeployment()
//       })

//       it("initialize the constructor correctly", async () => {})
//     })
