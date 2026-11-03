import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />
        <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card serviceName="Periodic Maintenance" imgSrc="/img/periodic-maintenance.jpg"/>
          <Card serviceName="Battery & Electrical System Check" imgSrc="/img/battery-electrical.jpg"/>
          <Card serviceName="Brake & Suspension Service" imgSrc="/img/brake-suspension.jpg"/>
          <Card serviceName="Wheel Alignment & Tire Balancing" imgSrc="/img/wheel-alignment.jpg"/>
          <Card serviceName="AC Cleaning & Ozone Sterilization" imgSrc="/img/ac-cleaning.jpg"/>
        </div>
      </main>
    </div>
  );
}
