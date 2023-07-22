import { format } from "date-fns";
import "./styles.css";

interface IDateTimeProps {
  date: number;
  displayFormat?: string;
  className?: string;
}

const DateTime = ({
  date,
  displayFormat = "dd-MM-yyyy hh:mm a",
  className = "",
}: IDateTimeProps) => {
  function formatDateToDDMMYYYY(date: number, displayFormat: string) {
    return format(date, displayFormat);
  }

  return (
    <section className={`date-time-wrapper ${className}`}>
      {formatDateToDDMMYYYY(date, displayFormat)}
    </section>
  );
};

export default DateTime;
