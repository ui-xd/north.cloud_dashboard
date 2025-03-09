import { env } from "$env/dynamic/private";

export const load = async ({ fetch }) => {
  const API_BASE_URL = env.VITE_API_BASE_URL;
  const API_TOKEN = env.VITE_API_TOKEN || "";

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: API_TOKEN,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}`, requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      apiData: data,
    };
  } catch (error) {
    console.error("Error fetching API data:", error);

    return {
      apiData: null,
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: "error",
      },
    };
  }
};
