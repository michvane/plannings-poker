import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { User } from "../types";

type Message = {
  user: string;
  text: string;
};

let socket: Socket;

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      if (!socket) return;

      console.log("joining");
      socket.emit("join", { name: router.query.name, room: router.query.room });

      socket.on("update-cards", (users: User[]) => {
        setUsers(users);
      });
      socket.on("message", (message) => {
        // Quick display of user joined
        setMessages((messages) => [...messages, message]);
      });
      socket.on("users", (users) => setUsers(users));
    };

    socketInitializer();
  }, [router.query.name, router.query.room]);

  console.log(messages);

  const selectCardHandler = (e: number) => {
    setSelectedCard(e);
    socket.emit("card-change", e);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {messages.map((val, i) => {
            return <div key={i}>{val.text}</div>;
          })}
        </div>
        <div className={styles.grid}>
          <div
            className={styles.card}
            onClick={() => selectCardHandler(1)}
            style={selectedCard === 1 ? { border: "2px solid blue" } : {}}
          >
            1
          </div>
          <div
            className={styles.card}
            onClick={() => selectCardHandler(2)}
            style={selectedCard === 2 ? { border: "2px solid blue" } : {}}
          >
            2
          </div>
        </div>
        <div>
          {users.map((user: User) => (
            <div key={user.name}>
              <span>{user.name}</span>
              <span>{user.selectedCard}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;