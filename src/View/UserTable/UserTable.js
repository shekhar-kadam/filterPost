import React from "react";
// import TableGrid from "../../Components/TableGrid";

function UserTable({ newUserData }) {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 px-4 mx-4">
      {newUserData?.map((elem) => (
        <div className="cardDiv border-2 rounded-lg m-3 p-2" key={elem?.id}>
          <div className="text-center font-bold py-2 bg-red-400 text-white">
            {" "}
            {elem?.title}
          </div>
          <div className="text-justify px-2"> {elem?.body}</div>
        </div>
      ))}
    </div>
  );
}

export default UserTable;
