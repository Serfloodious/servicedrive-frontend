"use client";

import { usePathname } from "next/navigation";
import TopMenuItem from "./TopMenuItem";

export default function HomeLink() {
    const pathname = usePathname();

    if (pathname === "/") {
        return null;
    }

    return <TopMenuItem title="Home" pageRef="/" />;
}
