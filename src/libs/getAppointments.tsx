export default async function getAppointments(token: string) {
    
    const response = await fetch("http://localhost:5000/api/v1/appointments", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["appointments"]
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return await response.json();
}