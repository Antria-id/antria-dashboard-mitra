import React, { useState } from "react";
import Table from "../../component/table/table-karyawan";

export default function Karyawan({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`bg-white mt-[1.5rem] rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 sm:w-[77rem] w-[23.4rem] sm:h-[51.563rem] h-[43.2rem] sm:overflow-y-hidden overflow-y-auto`}
    >
      <h1 className="text-2xl p-6 font-semibold">Data Akun</h1>
      <div className="px-6 pb-6">
        <Table data={data} />
      </div>
    </aside>
  );
}
