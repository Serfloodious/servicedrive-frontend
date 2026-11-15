export default async function getService(id: string) {
    
    const response = await fetch(`http://localhost:5000/api/v1/services/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch service details");
    }

    return await response.json();
}