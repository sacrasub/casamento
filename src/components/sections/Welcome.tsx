"use client";

import { motion } from "framer-motion";

export function Welcome() {
  return (
    <section className="w-full py-20 bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
           className="max-w-4xl w-full text-center space-y-8"
         >
          <div className="flex justify-center mb-4">
            <span className="text-4xl">❤️</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-snug italic">
            Olá, está chegando o momento muito especial!
          </h2>
          <div className="w-12 h-0.5 bg-primary/20 mx-auto" />
          
          <div className="space-y-6 text-lg md:text-xl text-foreground/70 font-sans leading-relaxed text-balance">
            <p>
              O nosso casamento está próximo! Estamos muito felizes e contamos com a sua presença nesse dia tão importante!
            </p>
            <p>
              Para facilitar na organização do nosso casamento, criamos este site onde compartilhamos com você todos os detalhes do nosso evento.
            </p>
            <p>
              É muito importante que você <span className="text-primary font-semibold">confirme a sua presença</span>. Para isto, basta descer até a seção “Confirme sua Presença” e preencher os dados necessários.
            </p>
            <p>
              Para nos presentear, você pode escolher qualquer item da nossa <span className="text-primary font-semibold">Lista de Presentes</span> abaixo 😊
            </p>
            <p className="pt-4 font-serif text-2xl text-foreground italic">
              Aguardamos você no nosso grande dia!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
