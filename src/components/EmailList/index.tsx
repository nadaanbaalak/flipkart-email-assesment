import { lazy, Suspense } from "react";
import EmailListItem from "../EmailListItem";
import Spinner from "../common/Spinner";
import Filters from "../common/Filters";

import { IEmailListItemFromAttribute } from "../EmailListItem/types";
import { FILTERS } from "./constants";
import "./styles.css";
import { useFilters } from "./helperHooks";

const EmailBody = lazy(() => import("../EmailBody"));

export interface IEmailItem {
  id: string;
  from: IEmailListItemFromAttribute;
  date: number;
  subject: string;
  short_description: string;
}

const EmailList = () => {
  const {
    selectedFilter,
    isLoading,
    filteredEmails,
    openedMail,
    readEmails,
    favouriteEmails,
    handleFilterSelect,
    handleMailSelection,
    markAsFavourite,
    removeAsFavourite,
    markRead,
  } = useFilters();

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
          <section className="email-listing">
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
                  isEmailOpen={Boolean(openedMail)}
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
