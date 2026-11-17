"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../register/register.module.css";

export default function LogoutPage() {
    const [isSigningOut, setIsSigningOut] = useState(false);

    useEffect(() => {
        async function logout() {
            setIsSigningOut(true);
            await signOut({ callbackUrl: "/" });
        }

        void logout();
    }, []);

    return (
        <main className={styles.page}>
            <section className={styles.card} aria-labelledby="logout-title">
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>ServiceDrive</p>
                    <h1 id="logout-title">Sign out</h1>
                    <p>{isSigningOut ? "Signing you out..." : "Preparing to sign out..."}</p>
                </div>

                <p className={styles.footer}>
                    Not ready to leave? <Link href="/">Return home</Link>
                </p>
            </section>
        </main>
    );
}
