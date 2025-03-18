import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { bn } from "date-fns/locale"; // Import Bengali locale

export const ClassSchedule = () => {
  const locales = {
    bn,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }), // Week starts on Sunday
    getDay,
    locales,
  });

  // Sample class events for Bangladesh timezone
  const events = [
    {
      title: "Math Class",
      start: new Date(2024, 11, 9, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
      end: new Date(2024, 11, 9, 11, 30),
    },
    {
      title: "Science Class",
      start: new Date(2023, 11, 15, 14, 0),
      end: new Date(2023, 11, 15, 15, 30),
    },
    {
      title: "English Class",
      start: new Date(2023, 11, 20, 9, 0),
      end: new Date(2023, 11, 20, 10, 30),
    },
    {
      title: "History Class",
      start: new Date(2023, 11, 25, 11, 0),
      end: new Date(2023, 11, 25, 12, 30),
    },
  ];

  return (
    <div className="shadow-md rounded-lg p-6 h-min bg-white mt-5">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 200px)" }}
        className="shadow-lg responsive-calendar"
        defaultView="month"
        views={["month", "week", "day"]}
        toolbar={true}
      />
    </div>
  );
};
