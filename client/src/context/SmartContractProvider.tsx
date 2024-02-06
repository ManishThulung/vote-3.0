import { Contract, ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import VotingABI from "../artifacts/contracts/Voting.sol/Voting.json";

interface SmartContractContextType {
  account: string | null;
  contract: Contract | null;
  isAdmin: boolean;
}
const SmartContractContext = createContext<SmartContractContextType>({
  account: null,
  contract: null,
  isAdmin: false,
});
export const useContract = () => {
  return useContext(SmartContractContext);
};

export const SmartContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window?.ethereum);

    const loadProvider = async () => {
      try {
        if (provider) {
          // if chain chages, reload
          window?.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          // if accounts chage, reload
          window?.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          // creating instance
          const contract = new ethers.Contract(
            contractAddress,
            VotingABI.abi,
            signer
          );

          setContract(contract);
          // console.log(account, "account");
          // console.log(contract, "contract");
        } else {
          toast("metamask not installed");
        }
      } catch (err) {
        toast("You dont have metamask please install it first");
      }
    };
    provider && loadProvider();
  }, []);

  useEffect(() => {
    const isOwner = async () => {
      try {
        const res = await contract?.isOwner(account);
        res && setIsAdmin(true);
      } catch (error) {
        toast("Unable to call isOwner");
      }
    };
    isOwner();
  }, [account, contract]);

  return (
    <SmartContractContext.Provider value={{ account, contract, isAdmin }}>
      {children}
    </SmartContractContext.Provider>
  );
};
