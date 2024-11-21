import { ChangeEvent} from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabelledInput = ({ label, placeholder, onChange, type}: LabelledInputType) => {
  return (
    <div>
      <label className="block mb-2 text-lg max-sm:text-base font-semibold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};