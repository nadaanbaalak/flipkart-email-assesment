import { useState, useEffect } from "react";
import EmailBody from "../EmailBody";
import EmailListItem from "../EmailListItem";
import { getEmailList } from "../../utils/apis";
import { IEmailListItemFromAttribute } from "../EmailListItem/types";
import "./styles.css";

export interface IEmailItem {
  id: string;
  from: IEmailListItemFromAttribute;
  date: number;
  subject: string;
  short_description: string;
}

const EmailList = () => {
  const [emailList, setEmailList] = useState<Array<IEmailItem>>([]);
  const [openedMail, setOpenedMail] = useState<IEmailItem | null>(null);

  function handleMailSelection(mailData: IEmailItem) {
    if (openedMail && mailData.id === openedMail.id) {
      setOpenedMail(null);
      return;
    }
    setOpenedMail(mailData);
  }

  useEffect(() => {
    async function getEmails() {
      const emails = await getEmailList();
      setEmailList(emails.list);
    }

    getEmails();
  }, []);

  return (
    <section className="email-list-pseudo-wrapper">
      <section className="email-list-wrapper">
        {emailList.map((email) => {
          const { id, from, date, short_description, subject } = email;

          return (
            <EmailListItem
              key={id}
              id={id}
              from={from}
              date={date}
              shortDescription={short_description}
              subject={subject}
              onClick={handleMailSelection}
            />
          );
        })}
      </section>
      {openedMail && (
        <section className="email-body-section">
          <EmailBody
            emailId={openedMail.id}
            emailDate={openedMail.date}
            emailSubject={openedMail.subject}
            from={openedMail.from}
            handleMarkFavourite={() => {}}
          />
        </section>
      )}
    </section>
  );
};

export default EmailList;
