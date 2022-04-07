import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getFilteredUsers,
} from "../../Redux/Action/GetUserAction";
import UserTable from "../../View/UserTable/UserTable";

function TableGrid() {
  const [startCount, setStartCount] = useState(1);
  const [newUserData, setNewUserData] = useState([]);
  const [newId, setNewId] = useState("");
  const {
    loading: userLoadding,
    data: userData,
    error: userError,
  } = useSelector((state) => state.getUsers);
  const {
    loading: userFilterLoadding,
    data: userFilterData,
    error: userFilterError,
  } = useSelector((state) => state.getFilterUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(startCount, 20));
  }, [dispatch, startCount]);

  useEffect(() => {
    if (startCount >= 1) {
      dispatch(getAllUsers(startCount, 20));
    }
  }, [dispatch, startCount]);

  // useEffect(() => {
  //   dispatch(getFilteredUsers(10, newId));
  // }, [newId, dispatch]);

  const previousValue = () => {
    if (startCount <= 1) return;
    setStartCount((prevValue) => {
      return prevValue - 1;
    });
  };
  const nextValue = () => {
    if (startCount >= 5) return;
    setStartCount((prevValue) => {
      return prevValue + 1;
    });
  };

  useEffect(() => {
    if (newId) setNewUserData(userFilterData);
  }, [userFilterData]);
  useEffect(() => {
    setNewUserData(userData);
  }, [userData]);

  const handleChange = (event) => {
    if (event.target.value) {
      // setNewId(event.target.value);
      let value = event.target.value;
      if (userData) {
        let filterArray = userData.filter((elem) => {
          if (elem?.id == value) {
            return elem;
          }
        });
        setNewUserData(filterArray);
      }
    } else {
      setNewId(1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center font-bold text-2xl">Posts Table</div>
      <div className="flex xl:flex-row  md:flex-row sm:flex-col m-auto ">
        <div className="pt-4 ml-5">
          <label>Filter</label>
          <select className="border-[1px] ml-2" onChange={handleChange}>
            <option value={1}>Select a user</option>
            {userData?.map((elem) => (
              <option value={elem?.id}>{elem?.title}</option>
            ))}
          </select>
        </div>
      </div>
      <UserTable newUserData={newUserData} />
      <div className="flex  m-auto pb-10 ">
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
          onClick={previousValue}
        >
          Prev
        </div>
        <div className="m-auto pl-10 font-bold text-center">{startCount}</div>
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
          onClick={nextValue}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default TableGrid;
