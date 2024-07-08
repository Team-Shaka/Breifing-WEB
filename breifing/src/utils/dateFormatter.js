// 날짜를 YYYY.MM.DD 형식과 요일로 변환하는 함수
export const formatDateWithDay = (date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ".");
  return `${formattedDate}(${dayOfWeek})`;
};

// 날짜를 YYYY-MM-DD 형식에서 YYYY.MM.DD 형식으로 변환하는 함수
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
