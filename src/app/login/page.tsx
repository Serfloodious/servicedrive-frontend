"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../register/register.module.css";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const callbackUrl = searchParams.get("callbackUrl");
    const safeCallbackUrl = callbackUrl?.startsWith("/") &&
        !callbackUrl.startsWith("//")
        ? callbackUrl
        : "/";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: safeCallbackUrl,
            });

            if (!result || result.error) {
                throw new Error("Invalid email or password.");
            }

            router.replace(safeCallbackUrl);
            router.refresh();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to sign in.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.card} aria-labelledby="login-title">
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>ServiceDrive</p>
                    <h1 id="login-title">Welcome back</h1>
                    <p>Sign in to appoint and manage your car service.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email*
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Password*
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Your password"
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    {errorMessage ? (
                        <p className={styles.error} role="alert">
                            {errorMessage}
                        </p>
                    ) : null}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Don&apos;t have an account? <Link href="/register">Register</Link>
                </p>
            </section>
        </main>
    );
}
