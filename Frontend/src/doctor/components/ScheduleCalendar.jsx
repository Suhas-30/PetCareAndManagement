import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ScheduleCalendar({ selectedDate, onChange }) {

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth()+2);

  return (
    <div className="
      bg-white/80 backdrop-blur-md
      rounded-3xl border border-gray-200
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      p-6
    ">
      <Calendar
        value={selectedDate}
        onChange={onChange}
        minDate={today}
        maxDate={maxDate}
      />
    </div>
  );
}