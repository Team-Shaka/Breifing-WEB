import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRecoilState } from "recoil";
import { managingDateState } from "../../recoil/atoms/managingDateState";
import dayjs from "dayjs";

function ManagingDatePicker() {
    const [selectedDate, setSelectedDate] = useRecoilState(managingDateState);

    const datePickerFormat = "YYYY-MM-DD";

    const datePickerUtils = {
        format: datePickerFormat,
        parse: (value) => AdapterDayjs(value, datePickerFormat, true).toDate(),
    };

    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format(datePickerFormat);
        setSelectedDate(formattedDate);
    };

    return (
        <div>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={datePickerUtils}
            >
                <DemoContainer
                    label="Responsive variant"
                    components={["DatePicker"]}
                >
                    <div className="bg-white rounded-md">
                        <DatePicker
                            value={selectedDate.date}
                            slotProps={{
                                textField: {
                                    size: "small",
                                },
                            }}
                            format={datePickerFormat}
                            onChange={(newValue) => {
                                handleDateChange(newValue);
                            }}
                        />
                    </div>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}

export default ManagingDatePicker;
