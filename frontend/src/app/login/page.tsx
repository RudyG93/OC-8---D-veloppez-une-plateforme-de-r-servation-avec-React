"use client";

import { useState, Suspense, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import InputText from "@/components/Ui/InputText";
import Button from "@/components/Ui/Button";

function LoginForm() {
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
            <div className="w-full max-w-lg rounded-[10px] bg-white p-8 shadow-sm md:p-12">
                <h1 className="text-2xl font-bold text-main-red md:text-3xl">
                    Heureux de vous revoir
                </h1>

                <p className="mt-3 text-sm text-dark-gray">
                    Connectez-vous pour retrouver vos réservations, vos annonces
                    et tout ce qui rend vos séjours uniques.
                </p>

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
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <Button variant="full" type="submit" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-2 text-sm">
                    <Link href="/forgot-password" className="text-main-red hover:underline">
                        Mot de passe oublié
                    </Link>
                    <p className="text-dark-gray">
                        Pas encore de compte ?{" "}
                        <Link href="/register" className="font-bold text-main-red hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
