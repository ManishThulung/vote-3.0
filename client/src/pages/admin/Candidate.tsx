import { useState } from "react";
import AppTable from "../../components/admin/Table";
import Header from "../../components/admin/dashboard/Header";
import AddMayor from "../../components/admin/modals/AddMayor";

const Candidate = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Header title="Add Candidates" />
      {/* <AddMayor open={open} setOpen={setOpen} /> */}
      <AddMayor />
      <AppTable />
    </div>
  );
};

export default Candidate;
