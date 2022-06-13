import Container from "components/Container";
import Form from "components/organisms/Form";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Typography from "../components/Typography";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Container
        size="wide"
        className="flex justify-center align-center flex-col"
      >
        <Typography
          as="h1"
          variant="xl"
          className={`text-defaultLight text-center font-bold`}
        >
          MoonPay
          <br />
          Planning Poker
        </Typography>
        <Form name={name} room={room} setName={setName} setRoom={setRoom} />
      </Container>
    </div>
  );
};

export default Home;
