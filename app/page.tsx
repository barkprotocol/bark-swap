"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [jupiterTerminal, setJupiterTerminal] = useState(null);

  useEffect(() => {
    // Load Jupiter Terminal
    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v2.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      const Jupiter = window.Jupiter;
      setJupiterTerminal(Jupiter);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (jupiterTerminal) {
      // @ts-ignore
      jupiterTerminal.init({
        displayMode: 'integrated',
        integratedTargetId: 'integrated-terminal',
        // Add any other configuration options here
      });
    }
  }, [jupiterTerminal]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Image
            src="https://ucarecdn.com/dd264726-4f83-4a3a-b36b-bad0fb3f58a5/logolight.png"
            alt="BARK logo"
            width={120}
            height={25}
            priority
          />
          <nav>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Learn</Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Projects</Button>
            <Button variant="outline" className="ml-4">Connect Wallet</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to BarkSwap</h1>
            <p className="text-xl text-gray-600 mb-6">Swap tokens effortlessly with the power of Jupiter Protocol</p>
            <Button className="bg-black text-white hover:bg-gray-800">Get Started</Button>
          </div>
          <Card className="w-full max-w-md mx-auto bg-white">
            <CardHeader>
              <CardTitle className="text-center">Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="integrated-terminal" className="w-full h-[400px]"></div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-200 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">&copy; 2024 BARK Protocol. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
            <a href="https://barkprotocol.com" className="text-gray-600 hover:text-gray-900">Go to Mainpage →</a>
          </div>
        </div>
      </footer>
    </div>
  );
}