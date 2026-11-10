"use client";
import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";

export default function Banner() {

    const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];
    const [coverIndex, setCoverIndex] = useState(0);

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
        </div>
    );
}