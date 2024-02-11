import { Button } from "antd";
interface IProps {
  title: string;
}
const Header = ({ title }: IProps) => {
  return <Button>{title}</Button>;
};

export default Header;
