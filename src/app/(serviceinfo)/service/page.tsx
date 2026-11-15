import getServices from "@/libs/getServices";
import ServiceCatalog from "@/components/ServiceCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Service() {

    const servicesJson = getServices();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium"> Select Your Service </h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <ServiceCatalog servicesJson={servicesJson} />
            </Suspense>
        </main>
    );
}
  