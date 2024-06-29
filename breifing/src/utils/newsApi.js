import axios from "axios";

export const fetchNews = async (currentDate, currentTimeOfDay) => {
  const dateString = currentDate.toISOString().split("T")[0];
  console.log(
    "Fetching news for date:",
    dateString,
    "and timeOfDay:",
    currentTimeOfDay
  );
  console.log("API Base URL:", process.env.REACT_APP_BASE_URL);

  try {
    const responses = await Promise.all([
      axios.get(
        `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SOCIAL&date=${dateString}&timeOfDay=${currentTimeOfDay}`
      ),
      axios.get(
        `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=GLOBAL&date=${dateString}&timeOfDay=${currentTimeOfDay}`
      ),
      axios.get(
        `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=ECONOMY&date=${dateString}&timeOfDay=${currentTimeOfDay}`
      ),
      axios.get(
        `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SCIENCE&date=${dateString}&timeOfDay=${currentTimeOfDay}`
      ),
    ]);
    responses.forEach((response) => console.log(response.data));

    return responses.map((response) => response.data.result.briefings);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
