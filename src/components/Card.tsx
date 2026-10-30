import styles from "./card.module.css";
import Image from "next/image";

export default function Card() {
    return (
        <div className={styles.card}>
            <div className={styles.cardimg}>
                <Image src={"/img/periodicMaintenance.jpg"}
                 alt="Service Picture"
                 fill={true}
                 objectFit="cover"
                />
            </div>
            <div className={styles.cardtxt}>
                <h2 style={{color: "#2565AE"}}>Periodic Maintenance</h2>
                <p>Standard engine oil and filter change, including a 30-point comprehensive vehicle safety inspection.</p>
            </div>
        </div>
    );
}