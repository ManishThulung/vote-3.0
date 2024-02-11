import { useNavigate } from "react-router-dom";
import { useContract } from "../../context/SmartContractProvider";
import { useEffect, useState } from "react";
import Button from "../../components/ui/atomic/Button";

function HomePage() {
  const [candidates, setCandidates] = useState<any>([]);
  const [voteCount, setVoteCount] = useState<number>(0);
  const navigate = useNavigate();
  const { account, isAdmin, contract } = useContract();

  if (isAdmin) {
    navigate("/admin");
  }

  const getCandidate = async () => {
    const res = await contract?.getCandidatesId();
    const allCandidates = [];
    if (res) {
      for (let i = 0; i < res.length; i++) {
        allCandidates.push(await contract?.getMayorCandidateById(res[i]));
      }
      setCandidates(allCandidates);
    }
  };

  const handleClick = async (id: string) => {
    try {
      console.log("id", id);
      const res = await contract?.voteMayor(id);
      if (res) {
        console.log("1111");
        contract?.on("*", (event) => {
          console.log("2222");
          debugger;
          console.log(event.eventName, event.args, event.log, "hasdfhkasldfj");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidate();
  }, [contract, account]);

  return (
    <div className="mx-8">
      <p className="text-lg font-medium text-center">
        My Account: {account ? account : "Please connect to metamask"}
      </p>
      {candidates &&
        candidates.map((item) => {
          return (
            <div key={item?.id}>
              <p>{item.id ? item.id : "hehe"}</p>
              <p>{item.name}</p>
              <p>{item.image}</p>
              <p>{item.party}</p>
              <p>{Number(item.voteCount)}</p>
              <Button onClick={() => handleClick(item.id)}>Vote</Button>
            </div>
          );
        })}
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
