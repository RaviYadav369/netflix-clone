export async function fetchRequest(endpoint: string) {
    const url = new URL(endpoint, import.meta.env.VITE_BASE_API);
    url.searchParams.append("api_key", import.meta.env.VITE_API_KEY)
    const response = await fetch(url)
    return response.json();
}