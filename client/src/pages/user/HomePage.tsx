import { useNavigate } from "react-router-dom";
import { useContract } from "../../context/SmartContractProvider";
import { useEffect, useState } from "react";

function HomePage() {
  const [condidate, setCandidate] = useState([]);
  const navigate = useNavigate();
  const { account, isAdmin, contract } = useContract();
  console.log(account, "acc");
  console.log(isAdmin, "isad");
  if (isAdmin) {
    navigate("/admin");
  }

  const getCandidate = async () => {
    const res = await contract?.getCandidatesId();
    if (res) {
      console.log(res, "res");
    }
  };

  useEffect(() => {
    getCandidate();
  }, [contract, account]);

  return (
    <div className="mx-8">
      <h1 className="text-4xl font-bold pt-20 pb-8 text-center">Drive 3.0</h1>

      <p className="text-lg font-medium text-center">
        My Account: {account ? account : "Please connect to metamask"}
      </p>
      {/* {contract && (
        <>
          <Display account={account} contract={contract} />
          <div className="flex gap-8 mt-16 justify-center">
            <FileUpload account={account} contract={contract} />
            <Modal contract={contract} />
          </div>
        </>
      )} */}
    </div>
  );
}

export default HomePage;
