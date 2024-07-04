const getCurrentTimeOfDay = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 17) {
    return "Morning";
  } else {
    return "Evening";
  }
};

export default getCurrentTimeOfDay;
