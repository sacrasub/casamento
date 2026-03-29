"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, Copy, Check } from "lucide-react";

interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isQuota: boolean;
  totalQuotas?: number;
}

const SAMPLE_GIFTS: Gift[] = [
  {
    id: "1",
    name: "Escorredor de Louças Inox",
    description: "Modelo Madri Cromado para nossa cozinha.",
    price: 372.55,
    imageUrl: "https://images.unsplash.com/photo-1584990344111-a3939307ef16?w=500&q=80",
    isQuota: false,
  },
  {
    id: "2",
    name: "Forno Elétrico 10 Litros",
    description: "Compacto 127V - Oster, perfeito para nossas receitas.",
    price: 410.33,
    imageUrl: "https://images.unsplash.com/photo-1584990344111-a3939307ef16?w=500&q=80",
    isQuota: false,
  },
  {
    id: "3",
    name: "Forno Ofor300 30 Litros",
    description: "Para prepararmos grandes almoços em família.",
    price: 852.23,
    imageUrl: "https://images.unsplash.com/photo-1584990344111-a3939307ef16?w=500&q=80",
    isQuota: true,
    totalQuotas: 5,
  },
  {
    id: "4",
    name: "Microondas Preto",
    description: "Praticidade para o nosso dia a dia.",
    price: 606.16,
    imageUrl: "https://images.unsplash.com/photo-1584990344111-a3939307ef16?w=500&q=80",
    isQuota: true,
    totalQuotas: 4,
  },
];

export function GiftList() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenModal = (gift: Gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("CHAVE-PIX-AQUI-SACRA-SHIRLEY");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SAMPLE_GIFTS.map((gift) => (
          <motion.div
             {...({
               key: gift.id,
               whileHover: { y: -5 }
             } as any)}
             className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-primary/5 flex flex-col group"
           >
            <div className="aspect-square overflow-hidden relative">
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {gift.isQuota && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-serif uppercase tracking-widest text-primary shadow-sm">
                  Cota
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-serif text-foreground truncate">
                  {gift.name}
                </h3>
                <p className="text-sm text-foreground/60 font-sans line-clamp-2">
                  {gift.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-serif text-primary">
                  R$ {gift.price.toFixed(2).replace(".", ",")}
                </span>
                <button
                  onClick={() => handleOpenModal(gift)}
                  className="px-4 py-2 bg-secondary/30 text-primary font-serif italic text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  Presentear
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedGift && (
          <motion.div
             {...({
               initial: { opacity: 0 },
               animate: { opacity: 1 },
               exit: { opacity: 0 }
             } as any)}
             onClick={() => setSelectedGift(null)}
             className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           >
             <motion.div
               {...({
                 initial: { opacity: 0, scale: 0.9, y: 20 },
                 animate: { opacity: 1, scale: 1, y: 0 },
                 exit: { opacity: 0, scale: 0.9, y: 20 }
               } as any)}
               onClick={(e) => e.stopPropagation()}
               className="bg-background max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden relative"
             >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-foreground/40 hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif italic">Contribuir com Presente</h3>
                <p className="text-foreground/60 text-sm font-sans">
                  Muito obrigado por participar deste momento especial conosco!
                </p>
              </div>

              <div className="bg-secondary/10 p-6 rounded-2xl space-y-4 text-center">
                <div className="space-y-1">
                   <p className="text-xs uppercase tracking-widest text-foreground/40 font-semibold italic">Você escolheu:</p>
                   <p className="text-lg font-serif text-primary">{selectedGift.name}</p>
                </div>
                
                <div className="py-4 space-y-2">
                  <div className="w-48 h-48 bg-white mx-auto p-4 rounded-xl border border-primary/10 flex items-center justify-center">
                    {/* Placeholder for QR Code */}
                    <div className="w-full h-full bg-slate-100 animate-pulse text-[10px] flex items-center justify-center text-slate-400 text-center">
                      QR CODE PIX <br/> R$ {selectedGift.price.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-sm font-serif italic text-primary">Valor: R$ {selectedGift.price.toFixed(2).replace(".", ",")}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-foreground/60 uppercase tracking-widest">Chave PIX Copia e Cola:</p>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-primary/10 overflow-hidden">
                    <span className="text-[10px] truncate text-foreground/60 flex-1 text-left">CHAVE-PIX-AQUI-SACRA-SHIRLEY</span>
                    <button
                      onClick={handleCopyPix}
                      className="p-2 hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-primary" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/40 ml-2">Seu Nome / Deixar Recado</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-secondary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <button
                   onClick={() => setIsModalOpen(false)}
                   className="w-full py-4 bg-primary text-white font-serif tracking-widest text-lg rounded-full hover:bg-primary/90 transition-all shadow-lg"
                >
                  CONCLUÍDO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
