import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import style from './form.module.scss';
import useOutsideAlerter from 'hooks/OutsideAlerter';

const Form: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);

  const wrapperRef = useRef(null);
  const { state: showExistingRooms, setState: setShowExistingRooms } =
    useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (!router.query.room) return;
    setRoom(router.query.room as string);
  }, [router.query.room, setRoom]);

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !room) {
      return;
    }

    router.push(`/poker?name=${name}&room=${room}`);
  };

  return (
    <form
      className={clsx([style.form, 'bg-neutral-800'])}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Name">Name</label>
      <input
        id="Name"
        placeholder="Name"
        type="text"
        onChange={(event) => setName(event.target.value)}
        required
      />
      <div className={style.roomsWrapper} ref={wrapperRef}>
        <label htmlFor="room">Room</label>
        <input
          autoComplete={'off'}
          id="room"
          placeholder={
            rooms.length >= 1 ? 'Search or create room' : 'Create room'
          }
          type="text"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
          required
          onFocus={() => setShowExistingRooms(true)}
          style={
            showExistingRooms && rooms.length >= 1
              ? { borderRadius: '0.5rem 0.5rem 0 0 ' }
              : undefined
          }
        />
        {showExistingRooms && rooms.length >= 1 && (
          <div className={style.rooms}>
            <div className={style.disabledOption}>
              - Currently existing rooms -
            </div>
            {rooms
              .filter((existingRoom) => existingRoom.includes(room))
              .map((room) => {
                return (
                  <div
                    key={room}
                    className={style.option}
                    onClick={() => {
                      setRoom(room);
                      setShowExistingRooms(false);
                    }}
                  >
                    {room}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <button className={style.submitButton} type="submit">
        Join room
      </button>
    </form>
  );
};

export default Form;
