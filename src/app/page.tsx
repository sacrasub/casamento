import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { RSVPForm } from "@/components/sections/RSVPForm";
import { GiftList } from "@/components/sections/GiftList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Welcome />
      
      {/* Event Info Section */}
      <section id="informacoes" className="w-full py-20 bg-background flex flex-col items-center justify-center px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground italic">
            Onde & Quando
          </h2>
          <div className="w-24 h-0.5 bg-primary/30 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-serif text-primary uppercase tracking-widest">
              A Cerimônia e Recepção
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed font-sans">
              Igreja Congregacional de Mangueira<br />
              Av. Santos Dumont, 30 - Vila Ibirapitanga, Itaguaí - RJ<br />
              <span className="font-semibold mt-2 block">Data:</span> 18 de Abril de 2026<br />
              <span className="font-semibold">Horário:</span> 18h30
            </p>
            <div className="space-y-4">
               <h3 className="text-2xl font-serif text-primary uppercase tracking-widest pt-4">
                Traje
              </h3>
              <p className="text-lg text-foreground/80 font-sans">
                Esporte Fino / Social<br />
                <span className="italic text-sm text-foreground/60">Sugerimos cores claras e tons pastéis para harmonia visual do evento.</span>
              </p>
            </div>
          </div>
          
          <div className="w-full h-80 bg-secondary/20 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-primary/10 relative">
            <iframe 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               loading="lazy" 
               allowFullScreen
               src="https://maps.google.com/maps?q=Av.+Santos+Dumont,+30+-+Vila+Ibirapitanga,+Itagua%C3%AD+-+RJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
               title="Mapa do Local"
            />
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="w-full py-20 bg-secondary/10 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full bg-background rounded-3xl p-8 md:p-12 shadow-xl border border-primary/5 space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif italic">
              Confirmar Presença
            </h2>
            <p className="text-foreground/60 font-sans tracking-wide">
              Por favor, confirme sua presença até o dia 18 de Março de 2026.
            </p>
          </div>
          
          <div className="mt-8">
            <RSVPForm />
          </div>
        </div>
      </section>

      {/* Gift List Section */}
      <section id="presentes" className="w-full py-20 bg-background flex flex-col items-center justify-center px-4 space-y-12">
         <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground italic">
            Lista de Presentes
          </h2>
          <p className="max-w-xl mx-auto text-foreground/60 font-sans leading-relaxed">
            Sua presença é o nosso maior presente! Caso queira nos presentear de forma simbólica, criamos uma lista de cotas virtuais.
          </p>
          <div className="w-24 h-0.5 bg-primary/30 mx-auto" />
        </div>
        
        <GiftList />
      </section>

      <footer className="w-full py-12 bg-secondary/5 text-center space-y-4 border-t border-primary/10">
        <p className="text-foreground/40 font-serif tracking-widest text-sm">
          SACRAMENTO & SHIRLEY • 18.04.2026
        </p>
        <div className="pt-4 border-t border-primary/5 max-w-xs mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold mb-1">
            Gostou do site? Entre em contato:
          </p>
          <p className="text-xs text-primary/60 font-sans font-medium">
            21 98112-5314 • SacraSub
          </p>
        </div>
      </footer>
    </main>
  );
}
