interface IEmailListItemProps {
  id: string;
  from: IEmailListItemFromAttribute;
  date: number;
  subject: string;
  shortDescription: string;
}

interface IEmailListItemFromAttribute {
  email: string;
  name: string;
}

const EmailListItem = ({
  id,
  from,
  date,
  subject,
  shortDescription,
}: IEmailListItemProps) => {
  return <></>;
};

export default EmailListItem;
