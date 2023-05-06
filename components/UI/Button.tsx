import { FC } from "react";

type ButtonProps = {
  text: string;
  action?: (param?: any) => void;
};

const Button: FC<ButtonProps> = ({ text, action = () => {} }) => (
  <button
    onClick={() => action()}
    className="py-2 px-4 rounded bg-white text-slate-400"
  >
    {text}
  </button>
);

export default Button;
