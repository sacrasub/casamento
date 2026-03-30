"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TARGET_DATE = new Date("2026-04-18T00:00:00");

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const images = [
    "/images/hero/photo1.jpg",
    "/images/hero/photo2.jpg",
    "/images/hero/photo3.jpg",
    "/images/hero/photo4.jpg",
    "/images/hero/photo5.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(imageTimer);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt="Background Couple Image"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-black/30 to-black/10" />

      <div className="relative z-10 text-center px-4 space-y-8">
        <motion.div
          {...({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, ease: "easeOut" }
          } as any)}
          className="space-y-4"
        >
          <p className="text-primary font-serif italic text-xl md:text-2xl tracking-widest uppercase text-shadow">
            Nós vamos nos casar!
          </p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-md">
            Daniel Sacramento <span className="text-primary">&</span> Shirley Gutierrez
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-white/90 tracking-widest mt-4 drop-shadow">
            18 DE ABRIL DE 2026
          </p>
        </motion.div>

        <motion.div
          {...({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5, duration: 1 }
          } as any)}
          className="flex justify-center gap-4 md:gap-8"
        >
          <CountdownItem value={timeLeft.days} label="Dias" />
          <CountdownItem value={timeLeft.hours} label="Horas" />
          <CountdownItem value={timeLeft.minutes} label="Minutos" />
          <CountdownItem value={timeLeft.seconds} label="Segundos" />
        </motion.div>

        <motion.div
          {...({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1, duration: 1 }
          } as any)}
          className="pt-8"
        >
          <a
            href="#rsvp"
            className="inline-block px-10 py-4 bg-primary text-white font-serif tracking-widest text-lg rounded-full hover:bg-primary/90 transition-colors shadow-lg"
          >
            CONFIRMAR PRESENÇA
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-primary/90 font-medium drop-shadow-md">
        {label}
      </span>
    </div>
  );
}
