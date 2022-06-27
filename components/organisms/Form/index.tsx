import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './form.module.scss';

const Form: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (!router.query.room) return;
    setRoom(router.query.room as string);
  }, [router.query.room, setRoom]);

  return (
    <form
      className={clsx([style.form, 'bg-neutral-800'])}
      onSubmit={(e) => (!name || !room ? e.preventDefault() : null)}
    >
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
      <Link href={`/poker?name=${name}&room=${room}`}>
        <button>Sign In</button>
      </Link>
    </form>
  );
};

export default Form;
