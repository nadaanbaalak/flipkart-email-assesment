import { useEffect, useRef, useState } from "react";
import DateTime from "../common/DateTime";
import Avatar from "../common/Avatar";
import Spinner from "../common/Spinner";
import { getEmailById } from "../../utils/apis";
import { IEmailListItemProps } from "../EmailListItem";
import "./styles.css";

interface IEmailBodyProps {
  emailId: IEmailListItemProps["id"];
  emailSubject: IEmailListItemProps["subject"];
  emailDate: IEmailListItemProps["date"];
  from: IEmailListItemProps["from"];
  handleMarkFavourite(id: IEmailListItemProps["id"]): void;
  handleRemoveFromFavourite(id: IEmailListItemProps["id"]): void;
  handleMarkRead(id: IEmailListItemProps["id"]): void;
  isUnread: boolean;
  isFavourite: boolean;
}

const EmailBody = ({
  emailId,
  emailSubject,
  emailDate,
  from,
  handleMarkFavourite,
  handleRemoveFromFavourite,
  handleMarkRead,
  isUnread,
  isFavourite,
}: IEmailBodyProps) => {
  const [emailBody, setEmailBody] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timerIdRef = useRef<null | number>(null);

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

  useEffect(() => {
    if (isUnread) {
      timerIdRef.current = setTimeout(() => {
        handleMarkRead(emailId);
      }, 3000);
    }
    // will clear timer if the email is closed within 3 sec
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return (
    <section className="email-body-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Avatar name={from.name} />
          <section className="email-body-content">
            <div className="email-subject-wrapper">
              <p>{emailSubject}</p>
              <button
                onClick={() => {
                  if (isFavourite) {
                    handleRemoveFromFavourite(emailId);
                  } else {
                    handleMarkFavourite(emailId);
                  }
                }}
                className="mark-as-favourite-btn"
              >
                {isFavourite ? "Remove from favourites" : "Mark as Favourite"}
              </button>
            </div>
            <section className="email-subject-time">
              <DateTime date={emailDate} className="email-time" />
            </section>
            <article dangerouslySetInnerHTML={{ __html: emailBody || "" }} />
          </section>
        </>
      )}
    </section>
  );
};

export default EmailBody;
