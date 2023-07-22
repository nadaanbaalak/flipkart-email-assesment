import Avatar from "../common/Avatar";
import DateTime from "../common/DateTime";
import { IEmailListItemFromAttribute } from "./types";
import { IEmailItem } from "../EmailList";
import "./styles.css";

export interface IEmailListItemProps {
  id: string;
  from: IEmailListItemFromAttribute;
  date: number;
  subject: string;
  shortDescription: string;
  onClick(data: IEmailItem): void;
}

const EmailListItem = ({
  id,
  from,
  date,
  subject,
  shortDescription,
  onClick,
}: IEmailListItemProps) => {
  return (
    <section
      onClick={() => {
        onClick({
          id,
          from,
          short_description: shortDescription,
          date,
          subject,
        });
      }}
      className="email-item-wrapper"
    >
      <section>
        <Avatar name={from.name} />
      </section>
      <section>
        <section className="email-item-info">
          <div>
            From:{" "}
            <span className="email-item-from">{`${from.name} <${from.email}>`}</span>
          </div>
          <div>
            Subject: <span className="email-item-subject">{subject}</span>
          </div>
        </section>
        <section className="email-item-summary">
          <p>{shortDescription}</p>
          <DateTime date={date} />
        </section>
      </section>
    </section>
  );
};

export default EmailListItem;
