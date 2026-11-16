import { ServiceJson } from "../../interface";

export default async function getServices() {
    
    const response = await fetch("http://localhost:5000/api/v1/services", {next: {tags: ["services"]}});

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return await response.json() as ServiceJson;
}