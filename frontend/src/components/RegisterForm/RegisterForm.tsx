"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import InputText from "@/components/Ui/InputText";
import Button from "@/components/Ui/Button";
import Checkbox from "@/components/Ui/Checkbox";

/**
 * Formulaire d'inscription avec nom, prénom, email, mot de passe et acceptation CGU.
 */
export default function RegisterForm() {
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
            <div className="w-full max-w-2xl rounded-[10px] bg-white px-5 py-10 md:px-15 md:py-25">
                <h1 className="text-2xl font-bold text-main-red md:text-3xl text-center">
                    Rejoignez la communauté Kasa
                </h1>

                <p className="mt-3 text-center text-sm">
                    Créez votre compte et commencez à voyager autrement : réservez
                    des logements uniques, découvrez de nouvelles destinations et
                    partagez vos propres lieux avec d&apos;autres voyageurs.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 md:mx-10 flex flex-col gap-5">
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
                        label={<><span className="text-[10px] md:text-sm">J&apos;accepte les <span className="underline">conditions générales d&apos;utilisation</span></span></>}
                        checked={acceptCGU}
                        onChange={(e) => setAcceptCGU(e.target.checked)}
                    />

                    {error && (
                        <p className="text-sm text-red-600" role="alert">{error}</p>
                    )}

                    <Button variant="fit" type="submit" disabled={loading} className="self-center px-5 md:px-15 text-medium">
                        {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-main-red">
                    Déjà membre ?{" "}
                    <Link href="/login" className="font-bold text-main-red hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </main>
    );
}
