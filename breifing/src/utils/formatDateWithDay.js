// 날짜를 YYYY.MM.DD 형식과 요일로 변환하는 함수
const formatDateWithDay = (date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ".");
  return `${formattedDate}(${dayOfWeek})`;
};

export default formatDateWithDay;
