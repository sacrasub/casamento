"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, UserCheck, Utensils, Lock, Loader2 } from "lucide-react";

interface Guest {
  id: string;
  full_name: string;
  attending: boolean;
  companions: number;
  dietary_restrictions: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified password check for demonstration
    // In production, this would compare with process.env.ADMIN_PASSWORD via a Server Action
    if (password === "123456") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Senha incorreta");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGuests();
    }
  }, [isAuthenticated]);

  async function fetchGuests() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGuests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalConfirmed = guests.filter(g => g.attending).reduce((acc, g) => acc + 1 + g.companions, 0);
  const totalGuestsRecords = guests.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary/10 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-background p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 border border-primary/5">
          <div className="text-center space-y-2">
            <Lock className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-2xl font-serif italic">Acesso Restrito</h1>
            <p className="text-sm text-foreground/60 font-sans">Insira a senha do painel</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-secondary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Senha"
          />
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white font-serif tracking-widest rounded-full hover:bg-primary/90 transition-all font-bold"
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/5 p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-serif text-foreground italic">Dashboard de Convidados</h1>
          <p className="text-foreground/60 font-sans tracking-widest uppercase text-xs">Daniel Sacramento & Shirley Gutierrez</p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("admin_auth");
            setIsAuthenticated(false);
          }}
          className="text-xs uppercase tracking-widest text-primary hover:underline font-bold"
        >
          Sair do Painel
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <StatCard 
          icon={<Users className="w-6 h-6 text-primary" />} 
          label="Total de Confirmações" 
          value={totalGuestsRecords.toString()} 
        />
        <StatCard 
          icon={<UserCheck className="w-6 h-6 text-green-500" />} 
          label="Pessoas Confirmadas" 
          value={totalConfirmed.toString()} 
          description="(Titulares + Acompanhantes)"
        />
        <StatCard 
          icon={<Utensils className="w-6 h-6 text-purple-500" />} 
          label="Restrições Alimentares" 
          value={guests.filter(g => g.dietary_restrictions).length.toString()} 
        />
      </div>

      <main className="max-w-7xl mx-auto bg-background rounded-3xl shadow-sm border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-secondary/10 border-b border-primary/5">
              <tr>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-foreground/40 font-bold">Nome</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-foreground/40 font-bold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-foreground/40 font-bold">Acompanhantes</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-foreground/40 font-bold">Restrições</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-foreground/40 font-bold">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : guests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-foreground/40 italic">
                    Nenhum convidado confirmado ainda.
                  </td>
                </tr>
              ) : (
                guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{guest.full_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tighter ${guest.attending ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {guest.attending ? 'Vou' : 'Não Vou'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{guest.companions}</td>
                    <td className="px-6 py-4 text-sm text-foreground/60 max-w-xs truncate">
                      {guest.dietary_restrictions || "-"}
                    </td>
                    <td className="px-6 py-4 text-xs text-foreground/40 italic">
                      {new Date(guest.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, description }: { icon: React.ReactNode; label: string; value: string; description?: string }) {
  return (
    <div className="bg-background p-6 rounded-3xl shadow-sm border border-primary/5 space-y-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-secondary/10 rounded-2xl">{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold">{label}</p>
          <p className="text-3xl font-serif text-foreground">{value}</p>
        </div>
      </div>
      {description && <p className="text-[10px] italic text-foreground/40">{description}</p>}
    </div>
  );
}
