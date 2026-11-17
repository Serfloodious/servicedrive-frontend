"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./topmenu.module.css";

export default function BackLink() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
        return null;
    }

    const parentPath = `/${segments.slice(0, -1).join("/")}`;

    return (
        <Link className={styles.itemcontainer} href={parentPath || "/"}>
            Back
        </Link>
    );
}
