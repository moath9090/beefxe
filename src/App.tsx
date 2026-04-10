/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Branches from './components/Branches';
import Recipes from './components/Recipes';
import Certificates from './components/Certificates';
import AgentInfo from './components/AgentInfo';
import LegalPages from './components/LegalPages';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Branches />
        <Recipes />
        <Certificates />
        <AgentInfo />
        <LegalPages />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
