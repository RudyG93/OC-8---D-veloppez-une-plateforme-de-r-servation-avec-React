"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import InputText from "@/components/Ui/InputText";
import Button from "@/components/Ui/Button";

/** Formulaire de connexion avec gestion d'état email/mot de passe et redirection post-login. */
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg rounded-[10px] bg-white px-10 py-15 md:px-20 md:py-25">
        <div className="text-center">
			<h1 className="text-2xl font-bold text-main-red md:text-3xl">
				Heureux de vous revoir
			</h1>

			<p className="mt-3 text-sm text-dark-gray">
				Connectez-vous pour retrouver vos réservations, vos annonces et tout
				ce qui rend vos séjours uniques.
			</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <InputText
            label="Adresse email"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputText
            label="Mot de passe"
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button
            variant="fit"
            type="submit"
            disabled={loading}
            className="self-center px-5 md:px-15 text-medium"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-main-red">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-bold text-main-red hover:underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </main>
  );
}
