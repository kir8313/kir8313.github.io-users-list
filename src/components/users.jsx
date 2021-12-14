import React, { useState } from "react";
import API from "../api/index";
import getWord from "../utils/peoples";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const peoples = ["человек", "человека", "человек"];

  const handleDelete = (userId) => {
    setUsers((prevState) => {
      return prevState.filter((user) => user._id !== userId);
    });
  };

  const handleBadge = () => {
    const success = `${users.length} ${getWord(
      users.length,
      peoples
    )} тусанет с тобой`;
    return users.length === 0 ? "Никто с тобой не тусанет" : success;
  };

  const handleBadgeClasses = () => {
    let bageClass = "badge fs-3 m-2 ";
    bageClass += users.length === 0 ? "bg-danger" : "bg-primary";
    return bageClass;
  };

  const renderUserInfo = (users) => {
    return users.map((user) => (
      <tr id={user._id} key={user._id}>
        <td>{user.name}</td>
        <td>{addQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    function addQualities(qualities) {
      return qualities.map((quality) => {
        return (
          <p className={addQualitiesClasses()} key={quality._id}>
            {quality.name}
          </p>
        );

        function addQualitiesClasses() {
          let classes = "badge ms-2 fs-7 bg-";
          classes += quality.color;
          return classes;
        }
      });
    }
  };
  return users.length === 0 ? (
    <h1 className={handleBadgeClasses()}>{handleBadge()}</h1>
  ) : (
    <>
      <h1 className={handleBadgeClasses()}>{handleBadge()}</h1>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUserInfo(users)}</tbody>
      </table>
    </>
  );
};

export default Users;
