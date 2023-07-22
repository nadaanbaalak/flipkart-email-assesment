import { useEffect, useState } from "react";
import DateTime from "../common/DateTime";
import Avatar from "../common/Avatar";
import { getEmailById } from "../../utils/apis";
import { IEmailListItemProps } from "../EmailListItem";
import "./styles.css";
import Spinner from "../common/Spinner";

interface IEmailBodyProps {
  emailId: IEmailListItemProps["id"];
  emailSubject: IEmailListItemProps["subject"];
  emailDate: IEmailListItemProps["date"];
  from: IEmailListItemProps["from"];
  handleMarkFavourite(): void;
}

const EmailBody = ({
  emailId,
  emailSubject,
  emailDate,
  from,
  handleMarkFavourite,
}: IEmailBodyProps) => {
  const [emailBody, setEmailBody] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getEmailBody() {
      setIsLoading(true);
      const emailBody = await getEmailById(emailId);
      setEmailBody(emailBody.body);
      setIsLoading(false);
    }
    if (emailId) {
      getEmailBody();
    }
  }, [emailId]);

  return (
    <section className="email-body-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Avatar name={from.name} />
          <section className="email-body-content">
            <section>
              <p>{emailSubject}</p>
              <DateTime date={emailDate} />
            </section>
            <article dangerouslySetInnerHTML={{ __html: emailBody || "" }} />
          </section>
        </>
      )}
    </section>
  );
};

export default EmailBody;
