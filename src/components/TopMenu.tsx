import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import BackLink from "./BackLink";
import HomeLink from "./HomeLink";

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menucontainer}>
            <div className={styles.leftmenu}>
                {
                    !session ? <Link href="/register">
                        <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                            Register
                        </div>
                    </Link>
                    : null
                }
                {
                    session ? <Link href="/logout">
                        <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                            Sign-Out of {session.user?.name}
                        </div>
                    </Link>
                    : <Link href="/login">
                        <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                            Sign-In
                        </div>
                    </Link>
                }
                <TopMenuItem title="Profile" pageRef="/profile" />
            </div>
            <HomeLink />
            <BackLink />
            <TopMenuItem title="Services" pageRef="/services" />
            <TopMenuItem title="Appointments" pageRef="/appointments" />
            <Image src={"/img/logo.png"} 
             className={styles.logoimg} 
             alt="logo" 
             width={0} 
             height={0} 
             sizes="100vh" 
            />
        </div>
    );
}