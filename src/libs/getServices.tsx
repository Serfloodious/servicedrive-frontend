export default async function getServices() {
    
    const response = await fetch("http://localhost:5000/api/v1/services")

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return await response.json();
}