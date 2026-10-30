import styles from "./banner.module.css";
import Image from "next/image";

export default function Banner() {
    return (
        <div className={styles.banner}>
            <Image src={"/img/cover.jpg"}
             alt="cover"
             fill={true}
             objectFit="cover"
            />
            <div className={styles.bannerText}>
                <h1>Welcome to ServiceDrive</h1>
                <h3>Your One-Stop Solution For All Your Service Needs</h3>
            </div>
        </div>
    );
}