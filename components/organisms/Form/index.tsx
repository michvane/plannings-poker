import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "./form.module.scss";

interface Props {
  name: string;
  room: string;
  setName: (name: string) => void;
  setRoom: (room: string) => void;
}

const Form: React.FC<Props> = ({ setRoom, setName, name, room }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.room) return;
    console.log("setting room");
    setRoom(router.query.room as string);
  }, [router.query.room, setRoom]);
  return (
    <form className={clsx([style.form, "bg-neutral-800"])}>
      <label htmlFor="Name">Name</label>
      <input
        id="Name"
        placeholder="Name"
        type="text"
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="room">Room</label>
      <input
        id="room"
        placeholder="Room"
        type="text"
        value={room}
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

export default Form;
