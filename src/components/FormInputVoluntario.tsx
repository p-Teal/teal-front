interface FormInputVoluntarioProps {
  type: string;
  name: string;
  text: string;
  autocomplete?: boolean;
}

export default function FormInputVoluntario({
  type,
  name,
  text,
  autocomplete,
}: FormInputVoluntarioProps) {

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="">{text}</label>

      <input type={type} name={name} id={name} autoComplete={autocomplete ? "on" : "off"}
      className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
    </div>
  )
}