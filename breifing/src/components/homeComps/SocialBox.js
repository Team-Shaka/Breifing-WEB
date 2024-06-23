import React from "react";
import { SocialDesktopBox } from "./SocialDesktopBox";
import { SocialMobileBox } from "./SocialMobileBox";

export function SocialBox({ briefingList, date, timeOfDay }) {
  return (
    <div className="xl:w-[1200px] p-2 mx-auto">
      <div className="sm:hidden">
        <SocialMobileBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
      <div className="hidden sm:block">
        <SocialDesktopBox
          briefingList={briefingList}
          date={date}
          timeOfDay={timeOfDay}
        />
      </div>
    </div>
  );
}
