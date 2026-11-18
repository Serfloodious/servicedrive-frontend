export default async function userRegister(userName: string, userTel: string, userEmail: string, userPassword: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.BACKEND_URL;
    if (!backendUrl) {
        throw new Error("Backend URL is not configured.");
    }

    const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? "Failed to register");
    }

    const result = await response.json();
    return result.data;
}