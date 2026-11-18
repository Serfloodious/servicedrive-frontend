export default async function getService(id: string) {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/services/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch service details");
    }

    return await response.json();
}