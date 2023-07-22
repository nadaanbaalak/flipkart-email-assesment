import { useState, useEffect } from "react";
import EmailBody from "../EmailBody";
import EmailListItem, { IEmailListItemProps } from "../EmailListItem";
import Filters from "../common/Filters";
import { getEmailList } from "../../utils/apis";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../../utils/localStorage";
import { IEmailListItemFromAttribute } from "../EmailListItem/types";
import {
  FAVOURITE_EMAIL_LOCAL_STORAGE_KEY,
  FILTERS,
  FilterSlugEnum,
  READ_EMAIL_LOCAL_STORAGE_KEY,
} from "./constants";
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
  const [filteredEmails, setFilteredEmails] = useState<Array<IEmailItem>>([]);
  const [favouriteEmails, setFavouriteEmails] = useState(() => {
    return getItemFromLocalStorage(FAVOURITE_EMAIL_LOCAL_STORAGE_KEY);
  });
  const [readEmails, setReadEmails] = useState(() => {
    return getItemFromLocalStorage(READ_EMAIL_LOCAL_STORAGE_KEY);
  });
  const [openedMail, setOpenedMail] = useState<IEmailItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("");

  function handleMailSelection(mailData: IEmailItem) {
    if (openedMail && mailData.id === openedMail.id) {
      setOpenedMail(null);
      return;
    }
    setOpenedMail(mailData);
  }

  function handleFilterSelect(filterSlug: string) {
    if (selectedFilter === filterSlug) {
      setSelectedFilter("");
      return;
    }
    setSelectedFilter(filterSlug);
  }

  function markAsFavourite(id: IEmailListItemProps["id"]) {
    let favouriteMails: Array<string> = [];
    if (favouriteEmails === null) {
      favouriteMails = [...favouriteMails, id];
    } else {
      favouriteMails = [...favouriteEmails, id];
    }
    setFavouriteEmails(favouriteMails);
    setItemInLocalStorage(FAVOURITE_EMAIL_LOCAL_STORAGE_KEY, favouriteMails);
  }

  function removeAsFavourite(id: IEmailListItemProps["id"]) {
    const favouriteMails = favouriteEmails.filter(
      (item: string) => item !== id
    );
    setFavouriteEmails(favouriteMails);
    setItemInLocalStorage(FAVOURITE_EMAIL_LOCAL_STORAGE_KEY, favouriteMails);
  }

  function markRead(id: IEmailListItemProps["id"]) {
    let readMails: Array<string> = [];
    if (readEmails === null) {
      readMails = [...readMails, id];
    } else if (!readEmails.includes(id)) {
      readMails = [...readEmails, id];
    }
    setReadEmails(readMails);
    setItemInLocalStorage(READ_EMAIL_LOCAL_STORAGE_KEY, readMails);
  }

  useEffect(() => {
    async function getEmails() {
      const emails = await getEmailList();
      setEmailList(emails.list);
      setFilteredEmails(emails.list);
    }

    getEmails();
  }, []);

  useEffect(() => {
    if (readEmails === null) {
      setItemInLocalStorage(READ_EMAIL_LOCAL_STORAGE_KEY, []);
    }
    if (favouriteEmails === null) {
      setItemInLocalStorage(FAVOURITE_EMAIL_LOCAL_STORAGE_KEY, []);
    }
  }, []);

  useEffect(() => {
    if (selectedFilter) {
      if (selectedFilter === FilterSlugEnum.READ) {
        const readMails = emailList.filter((email) =>
          readEmails.includes(email.id)
        );
        setFilteredEmails(readMails);
      } else if (selectedFilter === FilterSlugEnum.FAVOURITE) {
        const favouriteMails = emailList.filter((email) =>
          favouriteEmails.includes(email.id)
        );
        setFilteredEmails(favouriteMails);
      } else if (selectedFilter === FilterSlugEnum.UNREAD) {
        const unreadEmails = emailList.filter(
          (email) => !readEmails.includes(email.id)
        );
        setFilteredEmails(unreadEmails);
      }
    } else {
      setFilteredEmails(emailList);
    }
  }, [selectedFilter, favouriteEmails]);

  return (
    <section className="email-list-wrapper">
      <Filters
        filtersList={FILTERS}
        selectedFilter={selectedFilter}
        onFilterSelect={handleFilterSelect}
      />
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
              />
            );
          })}
        </section>
        {openedMail && filteredEmails.length > 0 && (
          <section className="email-body-section">
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
          </section>
        )}
      </section>
    </section>
  );
};

export default EmailList;
