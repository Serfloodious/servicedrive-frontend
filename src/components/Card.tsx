import styles from "./card.module.css";
import Image from "next/image";

export default function Card({serviceName, imgSrc}: {serviceName: string, imgSrc: string}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardimg}>
                <Image src={imgSrc}
                 alt="Service Picture"
                 fill={true}
                 objectFit="contain"
                />
            </div>
            <div className={styles.cardtxt}>
                <h2 style={{color: "#2565AE"}}>{serviceName}</h2>
            </div>
        </div>
    );
}