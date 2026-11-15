import styles from "./appointments.module.css";

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.sectionlayout}>
            {children}
        </div>
    )
}