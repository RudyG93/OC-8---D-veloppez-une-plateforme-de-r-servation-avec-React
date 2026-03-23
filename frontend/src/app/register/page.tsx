"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import InputText from "@/components/Ui/InputText";
import Button from "@/components/Ui/Button";
import Checkbox from "@/components/Ui/Checkbox";

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptCGU, setAcceptCGU] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!acceptCGU) {
            setError("Vous devez accepter les conditions générales d'utilisation.");
            return;
        }

        setLoading(true);

        try {
            await register({
                name: `${firstName} ${lastName}`.trim(),
                email,
                password,
            });
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-5 py-12">
            <div className="w-full max-w-lg rounded-[10px] bg-white p-8 shadow-sm md:p-12">
                <h1 className="text-2xl font-bold text-main-red md:text-3xl">
                    Rejoignez la communauté Kasa
                </h1>

                <p className="mt-3 text-center text-sm text-dark-gray">
                    Créez votre compte et commencez à voyager autrement : réservez
                    des logements uniques, découvrez de nouvelles destinations et
                    partagez vos propres lieux avec d&apos;autres voyageurs.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    <InputText
                        label="Nom"
                        id="lastName"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <InputText
                        label="Prénom"
                        id="firstName"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

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

                    <Checkbox
                        id="cgu"
                        label="J'accepte les conditions générales d'utilisation"
                        checked={acceptCGU}
                        onChange={(e) => setAcceptCGU(e.target.checked)}
                    />

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <Button variant="full" type="submit" disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-dark-gray">
                    Déjà membre ?{" "}
                    <Link href="/login" className="font-bold text-main-red hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </main>
    );
}
