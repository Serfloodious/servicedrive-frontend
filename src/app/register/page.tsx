"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";
import styles from "./register.module.css";

export default function RegisterPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const tel = String(formData.get("tel") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(formData.get("confirmPassword") ?? "");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            await userRegister(name, tel, email, password);
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!result || result.error) {
                throw new Error("Registration succeeded, but automatic sign-in failed.");
            }

            router.replace("/");
            router.refresh();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to register.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.card} aria-labelledby="register-title">
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>ServiceDrive</p>
                    <h1 id="register-title">Create your account</h1>
                    <p>Register to appoint and manage your car service.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Username*
                        <input id="name" name="name" type="text" placeholder="John" autoComplete="name" required />
                    </label>

                    <label htmlFor="tel">
                        Telephone number*
                        <input id="tel" name="tel" type="tel" placeholder="0987654321" autoComplete="tel" required />
                    </label>

                    <label htmlFor="email">
                        Email*
                        <input id="email" name="email" type="email" placeholder="john@example.com" autoComplete="email" required />
                    </label>

                    <label htmlFor="password">
                        Password*
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />
                    </label>

                    <label htmlFor="confirmPassword">
                        Confirm Password*
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />
                    </label>

                    {errorMessage ? (
                        <p className={styles.error} role="alert">
                            {errorMessage}
                        </p>
                    ) : null}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link href="/login">Sign in</Link>
                </p>
            </section>
        </main>
    );
}
