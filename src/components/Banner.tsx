"use client";

import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {

    const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];
    const [coverIndex, setCoverIndex] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className={styles.banner} onClick={() => setCoverIndex((coverIndex + 1) % covers.length)}>
            <Image src={covers[coverIndex]}
             alt="cover"
             fill={true}
             objectFit="cover"
            />
            <div className={styles.bannerText}>
                <h1 className="text-4xl font-medium">Welcome to ServiceDrive</h1>
                <h3 className="text-xl font-serif">Your One-Stop Solution For All Your Service Needs</h3>
            </div>
            {
                session ? <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">
                    Welcome {session.user?.name}
                </div>
                : null
            }
            <button className={styles.bannerButton} 
             onClick={(event) => {event.stopPropagation(); router.push('services')}}
            >
                Select Your Car Service. NOW!
            </button>
        </div>
    );
}