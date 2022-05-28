import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const InputFileName = ({ id, item, onBlur }) => {
  const [name, setName] = useState(item.file.name);

  useEffect(() => {
    setName(item.file.name);
  }, [item]);

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <input
        id={`title-${id}`}
        name={`title-${id}`}
        type="text"
        className="appearance-none bg-transparent border-none text-wht w-32 mr-3 py-1 px-2 leading-tight focus:outline-none text-left"
        max={50}
        onChange={onChange}
        onBlur={onBlur}
        value={name}
      />
      <FontAwesomeIcon
        className="cursor-pointer hover:scale-[1.40] text-wht"
        icon={faPen}
      />
    </>
  );
};
