import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="text-center">
      <h2>Welcome to the Event Management System</h2>
      <p>Find and book events quickly and easily.</p>
      <button className="btn btn-primary mt-3">Explore Events</button>
    </div>
  );
};

export default Home;
