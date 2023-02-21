import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
  return (
    <button
      className="bg-white/20 border border-slate-500/50 text-white font-bold py-1 px-4 rounded"
      type="button"
      {...props}
    />
  );
}

export default Button;
