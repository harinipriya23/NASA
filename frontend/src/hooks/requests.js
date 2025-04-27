const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch planets");
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  if (response.ok) {
    const data = await response.json();
    const fetchedLaunches = data.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
    return fetchedLaunches;
  }
}

async function httpAddNewLaunch(launch) {
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting launch:", error);
  }
}

async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Data from API abort:", data);
    return data;
  } catch (error) {
    console.error("Error aborting launch:", error);
  }
}

export { httpGetPlanets, httpGetLaunches, httpAddNewLaunch, httpAbortLaunch };
