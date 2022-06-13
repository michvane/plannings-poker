import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        placeholder="Name"
        type="text"
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="room">room</label>
      <input
        placeholder="Room"
        type="text"
        onChange={(event) => setRoom(event.target.value)}
        required
      />
      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        href={`/poker?name=${name}&room=${room}`}
      >
        <button>Sign In</button>
      </Link>
    </form>
  );
};

export default Home;
