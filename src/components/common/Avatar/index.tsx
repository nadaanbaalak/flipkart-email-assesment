import { IEmailListItemFromAttribute } from "../../EmailListItem/types";
import "./styles.css";

interface IAvatarProps {
  name: IEmailListItemFromAttribute["name"];
}

const Avatar = ({ name }: IAvatarProps) => {
  return <section className="avatar-wrapper">{name.charAt(0)}</section>;
};

export default Avatar;
