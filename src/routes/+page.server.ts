export const load = async ({ params, fetch }) => {
  const API_BASE_URL = "https://north-case-api.vercel.app/api";
  const API_TOKEN =
    "8WT05LTmEmJBmBWHROWGYmjulMDp3EIa38thJTBzc0R4VAGBVMpsifRsXu3bYPz7";

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
