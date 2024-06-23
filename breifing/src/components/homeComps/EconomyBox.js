import React from "react";
import EconomyDesktopBox from "./EconomyDesktopBox";
import EconomyMobileBox from "./EconomyMobileBox";

export function EconomyBox({ briefingList, date, timeOfDay }) {
  return (
    <div className="xl:w-[1200px] p-2 mx-auto">
      <div className="sm:hidden">
        <EconomyMobileBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
      <div className="hidden sm:block">
        <EconomyDesktopBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
    </div>
  );
}
