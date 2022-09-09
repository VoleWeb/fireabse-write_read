import { db } from "../src/firebase";
import { set, ref, onValue, remove } from "firebase/database";
import { uid } from "uid";
import { useEffect, useState, Fragment } from "react";

const CreateUser = (userId, email, password) => {
  set(ref(db, "users/" + userId), {
    id: userId,
    email: email,
    password: password,
  });
};

const GetUser = (userId) => {
  let userData = {};
  const userRef = ref(db, "users/" + userId);
  onValue(userRef, (snapshot) => {
    userData = snapshot.val();
  });
  return userData;
};

const DeleteUser = (userId, users) => {
  remove(ref(db, "users/" + userId));
  return users.length > 1 ? users.filter(user => user.id !== userId) : [];
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      const getUsers = data?.users;

      typeof getUsers !== "undefined" ? setUsers(Object.values(getUsers)) : "";
    });
  }, []);

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const uId = uid();
          CreateUser(uId, email, password);
          console.log(`new user created with this id: ${GetUser(uId).id}`);

          setEmail("");
          setPassword("");
        }}
      >
        <input
          type="text"
          placeholder="Your email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <input
          type="password"
          placeholder="Your password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <br />
        <button type="submit">Create User</button>
      </form>
      <ul>
        {users &&
          users.map((user, index) => (
            <li key={index}>
              <h2>{user.email}</h2>
              <span>{user.password}</span>
              <br />
              <input type="text" readOnly={true} value={user.id} /><br/>
              <button
                onClick={() => setUsers(DeleteUser(user.id, users))}
                type="button"
              >Delete</button>
            </li>
          ))}
        {!users.length && (
          <span style={{ color: "#666" }}>No users./.</span>
        )}
      </ul>
    </Fragment>
  );
}
