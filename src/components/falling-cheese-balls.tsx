'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const CHEESEBALL_COUNT = 15;
const CHEESEBALL_URL = 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png';

interface CheeseBall {
  id: number;
  style: React.CSSProperties;
}

export default function FallingCheeseBalls() {
  const [cheeseBalls, setCheeseBalls] = useState<CheeseBall[]>([]);

  useEffect(() => {
    const generateCheeseBalls = () => {
      const newCheeseBalls: CheeseBall[] = [];
      for (let i = 0; i < CHEESEBALL_COUNT; i++) {
        newCheeseBalls.push({
          id: i,
          style: {
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 8 + 10}s`, // 10s to 18s duration
            animationDelay: `${Math.random() * -20}s`, // -20s to 0s delay
            transform: `scale(${Math.random() * 0.5 + 0.5})`, // 0.5x to 1x scale
          },
        });
      }
      setCheeseBalls(newCheeseBalls);
    };
    generateCheeseBalls();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none overflow-hidden z-0">
      {cheeseBalls.map((ball) => (
        <div key={ball.id} className="absolute animate-fall -top-[50px]" style={ball.style}>
          <Image
            src={CHEESEBALL_URL}
            alt="Falling cheeseball"
            width={50}
            height={50}
            className="opacity-50"
          />
        </div>
      ))}
    </div>
  );
}
