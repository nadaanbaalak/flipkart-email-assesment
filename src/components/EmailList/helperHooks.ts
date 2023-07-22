import { useEffect, useState } from "react";
import { IEmailItem } from ".";
import {
  FAVOURITE_EMAIL_LOCAL_STORAGE_KEY,
  FilterSlugEnum,
  READ_EMAIL_LOCAL_STORAGE_KEY,
} from "./constants";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../../utils/localStorage";
import { IEmailListItemProps } from "../EmailListItem";

export function useFilters(emailList: Array<IEmailItem>) {
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
    setOpenedMail(null);
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
    const indexOfFavourite = favouriteEmails.findIndex(
      (item: string) => item === id
    );
    const nextOpenedFavouriteMailId =
      favouriteEmails[
        indexOfFavourite !== favouriteEmails.length - 1
          ? indexOfFavourite + 1
          : indexOfFavourite - 1
      ];
    const nextOpenedEmail = emailList.find(
      (item) => item.id === nextOpenedFavouriteMailId
    );
    const favouriteMails = favouriteEmails.filter(
      (item: string) => item !== id
    );
    if (nextOpenedEmail) {
      setOpenedMail(nextOpenedEmail);
    }
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
          readEmails?.includes(email.id)
        );
        setFilteredEmails(readMails);
      } else if (selectedFilter === FilterSlugEnum.FAVOURITE) {
        const favouriteMails = emailList.filter((email) =>
          favouriteEmails?.includes(email.id)
        );
        setFilteredEmails(favouriteMails);
      } else if (selectedFilter === FilterSlugEnum.UNREAD) {
        const unreadEmails = emailList.filter(
          (email) => !readEmails?.includes(email.id)
        );
        setFilteredEmails(unreadEmails);
      }
    } else {
      setFilteredEmails(emailList);
    }
  }, [selectedFilter, favouriteEmails]);

  useEffect(() => {
    setFilteredEmails(emailList);
  }, [emailList]);

  return {
    filteredEmails,
    selectedFilter,
    openedMail,
    readEmails,
    favouriteEmails,
    markAsFavourite,
    markRead,
    removeAsFavourite,
    handleFilterSelect,
    handleMailSelection,
  };
}
