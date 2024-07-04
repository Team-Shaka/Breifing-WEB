import GlobalMobileBox from "./GlobalMobileBox";
import GlobalDesktopBox from "./GlobalDesktopBox";

export function GlobalBox({ briefingList, date, timeOfDay }) {
  return (
    <div className="xl:w-[1200px] p-2 mx-auto">
      <div className="sm:hidden">
        <GlobalMobileBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
      <div className="hidden sm:block">
        <GlobalDesktopBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
    </div>
  );
}
