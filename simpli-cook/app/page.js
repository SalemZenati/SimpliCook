"use client";

import Navbar from './components/Navbar';
import SimpliCook from './components/SimpliCook';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div>
      <main className="">
        <Navbar/>
        <SimpliCook/>
        <Footer/>
      </main>
    </div>
  );
}
