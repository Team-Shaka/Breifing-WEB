import React from "react";
import { ScienceMobileBox } from "./ScienceMobileBox";
import { ScienceDesktopBox } from "./ScienceDesktopBox";

export function ScienceBox({ briefingList, date, timeOfDay }) {
  return (
    <div className="xl:w-[1200px] p-2 mx-auto">
      <div className="sm:hidden">
        <ScienceMobileBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
      <div className="hidden sm:block">
        <ScienceDesktopBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
    </div>
  );
}
