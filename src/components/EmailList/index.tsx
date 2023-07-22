import { lazy, Suspense, useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import EmailListItem from "../EmailListItem";
import Spinner from "../common/Spinner";
import Filters from "../common/Filters";
import { IEmailListItemFromAttribute } from "../EmailListItem/types";
import { FILTERS, ITEMS_PER_PAGE } from "./constants";
import "./styles.css";
import { useFilters } from "./helperHooks";
import { getEmailList } from "../../utils/apis";
import { usePagination } from "../../hooks/usePagination";

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
  const [totalElements, setTotalElements] = useState(0);

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

  const { paginationData, handleNextClick, handlePreviousClick } =
    usePagination(totalElements, ITEMS_PER_PAGE);

  useEffect(() => {
    async function getEmails() {
      setIsLoading(true);
      const emails = await getEmailList(paginationData.currentPage);
      setTotalElements(emails.total);
      setEmailList(emails.list);
      setIsLoading(false);
    }

    getEmails();
  }, [paginationData.currentPage]);

  return (
    <section className="email-list-wrapper">
      <section className="pagination-and-filters">
        <Filters
          filtersList={FILTERS}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
        <div className="pagination-section">
          <span>{`${
            (paginationData.currentPage - 1) * paginationData.itemsPerPage + 1
          } - ${paginationData.currentPage * paginationData.itemsPerPage} of ${
            paginationData.totalItems
          }`}</span>
          <button
            onClick={handlePreviousClick}
            disabled={paginationData.isPrevDisabled}
            className="pagination-button"
          >
            <FiChevronLeft size="1.5em" />
          </button>
          <button
            onClick={handleNextClick}
            disabled={paginationData.isNextDisabled}
            className="pagination-button"
          >
            <FiChevronRight size="1.5em" />
          </button>
        </div>
      </section>

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
