import { format } from "date-fns";
import "./styles.css";

interface IDateTimeProps {
  date: number;
  displayFormat?: string;
}

const DateTime = ({
  date,
  displayFormat = "dd-MM-yyyy hh:mm a",
}: IDateTimeProps) => {
  function formatDateToDDMMYYYY(date: number, displayFormat: string) {
    return format(date, displayFormat);
  }

  return (
    <section className="date-time-wrapper">
      {formatDateToDDMMYYYY(date, displayFormat)}
    </section>
  );
};

export default DateTime;
