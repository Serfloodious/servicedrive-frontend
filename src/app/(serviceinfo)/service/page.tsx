import getServices from "@/libs/getServices";
import CardPanel from "@/components/CardPanel";
import ServiceCatalog from "@/components/ServiceCatalog";

export default async function Service() {

    const servicesJson = await getServices();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium"> Select Your Service </h1>
            <ServiceCatalog servicesJson={servicesJson} />
        </main>
    );
}
  