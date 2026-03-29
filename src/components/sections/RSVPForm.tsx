"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  attending: z.boolean().default(true),
  companions: z.coerce.number().min(0, "Mínimo 0").max(10, "Máximo 10 acompanhantes"),
  dietaryRestrictions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attending: true,
      companions: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase.from("guests").insert([
        {
          full_name: data.fullName,
          attending: data.attending,
          companions: data.companions,
          dietary_restrictions: data.dietaryRestrictions || "",
        },
      ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error("Erro ao enviar RSVP:", err);
      setError("Houve um erro ao enviar sua confirmação. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4"
      >
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h3 className="text-3xl font-serif text-foreground">Obrigado!</h3>
        <p className="text-foreground/60 font-sans">
          Sua confirmação foi enviada com sucesso para Sacramento e Shirley.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary font-serif italic text-lg hover:underline"
        >
          Enviar outra confirmação
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-serif uppercase tracking-widest text-foreground/60">
            Nome Completo
          </label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-3 bg-secondary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
            placeholder="Seu nome"
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 font-sans mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex gap-8">
          <div className="space-y-1 flex-1">
            <label className="text-sm font-serif uppercase tracking-widest text-foreground/60">
              Acompanhantes
            </label>
            <input
              type="number"
              {...register("companions")}
              className="w-full px-4 py-3 bg-secondary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              min="0"
              max="10"
            />
            {errors.companions && (
              <p className="text-xs text-red-500 font-sans mt-1">{errors.companions.message}</p>
            )}
          </div>

          <div className="space-y-1 flex items-end pb-3">
             <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                {...register("attending")}
                className="w-5 h-5 accent-primary border-primary/10 rounded"
              />
              <span className="text-sm font-serif uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">
                Vou Comparecer
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-serif uppercase tracking-widest text-foreground/60">
            Restrições Alimentares (Opcional)
          </label>
          <textarea
            {...register("dietaryRestrictions")}
            rows={3}
            className="w-full px-4 py-3 bg-secondary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans resize-none"
            placeholder="Ex: Vegano, Alérgico a camarão..."
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-sans">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-white font-serif tracking-widest text-lg rounded-full hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              ENVIANDO...
            </>
          ) : (
            "CONFIRMAR PRESENÇA"
          )}
        </button>
      </form>
    </div>
  );
}
