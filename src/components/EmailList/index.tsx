import { lazy, Suspense, useEffect, useState } from "react";
import EmailListItem from "../EmailListItem";
import Spinner from "../common/Spinner";
import Filters from "../common/Filters";
import { IEmailListItemFromAttribute } from "../EmailListItem/types";
import { FILTERS } from "./constants";
import "./styles.css";
import { useFilters } from "./helperHooks";
import { getEmailList } from "../../utils/apis";

const EmailBody = lazy(() => import("../EmailBody"));

export interface IEmailItem {
  id: string;
  from: IEmailListItemFromAttribute;
  date: number;
  subject: string;
  short_description: string;
}

const EmailList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailList, setEmailList] = useState<Array<IEmailItem>>([]);

  const {
    selectedFilter,
    filteredEmails,
    openedMail,
    readEmails,
    favouriteEmails,
    handleFilterSelect,
    handleMailSelection,
    markAsFavourite,
    removeAsFavourite,
    markRead,
  } = useFilters(emailList);

  useEffect(() => {
    async function getEmails() {
      setIsLoading(true);
      const emails = await getEmailList();
      setEmailList(emails.list);
      setIsLoading(false);
    }

    getEmails();
  }, []);

  return (
    <section className="email-list-wrapper">
      <Filters
        filtersList={FILTERS}
        selectedFilter={selectedFilter}
        onFilterSelect={handleFilterSelect}
      />
      {isLoading ? (
        <div className="full-width-view full-height-view center">
          <Spinner />
        </div>
      ) : (
        <section className="email-list-content">
          <section
            className={`email-listing ${
              Boolean(openedMail) ? "email-listing-shrunk-state" : ""
            }`}
          >
            {filteredEmails.map((email) => {
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
                  isSomeEmailOpen={Boolean(openedMail)}
                  isCurrentEmailOpen={openedMail?.id === id}
                  isRead={readEmails?.includes(id)}
                />
              );
            })}
          </section>
          {openedMail && filteredEmails.length > 0 && (
            <section className="email-body-section">
              <Suspense fallback={<Spinner />}>
                <EmailBody
                  emailId={openedMail.id}
                  emailDate={openedMail.date}
                  emailSubject={openedMail.subject}
                  from={openedMail.from}
                  handleMarkFavourite={markAsFavourite}
                  handleRemoveFromFavourite={removeAsFavourite}
                  handleMarkRead={markRead}
                  isUnread={!readEmails?.includes(openedMail.id)}
                  isFavourite={favouriteEmails?.includes(openedMail.id)}
                />
              </Suspense>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default EmailList;
