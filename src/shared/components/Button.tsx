"use client"

interface BtnProp {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<BtnProp> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={`
        px-4 py-2 my-2 rounded-md font-semibold text-white
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black border-2 border-lime-500 hover:bg-gray-600"}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
