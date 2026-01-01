"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldenBubblesProps {
  count?: number;
  className?: string;
  minSize?: number;
  maxSize?: number;
}

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  initialX: number;
}

export function GoldenBubbles({
  count = 20,
  className,
  minSize = 20,
  maxSize = 100,
}: GoldenBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const newBubbles = Array.from({ length: count }, (_, i) => {
      const duration = Math.random() * 15 + 15; // 15-30s duration for slow elegance
      return {
        id: i,
        size: Math.random() * (maxSize - minSize) + minSize,
        left: Math.random() * 100,
        duration: duration,
        delay: -Math.random() * duration, // Negative delay to start mid-animation
        initialX: Math.random() * 100 - 50,
      };
    });
    setBubbles(newBubbles);
  }, [count, minSize, maxSize]);

  if (!active) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -bubble.size * 2,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.2), rgba(197, 160, 53, 0.05))`,
            boxShadow: `0 0 20px rgba(197, 160, 53, 0.1)`,
            border: "1px solid rgba(255, 215, 0, 0.1)",
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, Math.sin(bubble.id) * 30], // Gentle sway
            opacity: [0, 0.6, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut", // Smooth movement
          }}
        />
      ))}
    </div>
  );
}
