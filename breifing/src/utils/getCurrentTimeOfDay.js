const getCurrentTimeOfDay = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 4 && currentHour < 16) {
    return "Morning";
  } else {
    return "Evening";
  }
};

export default getCurrentTimeOfDay;
