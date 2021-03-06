import Container from 'components/atoms/Container';
import Form from 'components/organisms/Form';
import { NextPage } from 'next';
import { useEffect } from 'react';
import Typography from '../components/Typography';

const Home: NextPage = () => {
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
        <Form />
      </Container>
    </div>
  );
};

export default Home;
