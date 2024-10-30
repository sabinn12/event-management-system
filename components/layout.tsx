// components/Layout.tsx
import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Event Management System</title>
      </Head>
      
      <header className="bg-primary text-white p-3">
        <h1 className="text-center">Event Management System</h1>
      </header>

      <main className="container my-4">
        {children}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p>&copy; 2024 Event Management. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
