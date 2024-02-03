import { HardhatUserConfig } from "hardhat/config"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import { config as dotEnvConfig } from "dotenv"
dotEnvConfig()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const PRIVATE_KEY_ACCOUNT_2 = process.env.PRIVATE_KEY_ACCOUNT_2 || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKET_API_KRY = process.env.COINMARKET_API_KRY || ""

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY, PRIVATE_KEY_ACCOUNT_2] : [],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_API_KRY,
    token: "ETH",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    // player: {
    //   default: 1,
    // },
  },

  paths: {
    artifacts: "./client/src/artifacts",
  },
}

export default config
