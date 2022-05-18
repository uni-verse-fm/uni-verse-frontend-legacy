import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const InputTitle = ({ id, track, onBlur }) => {
  const [title, setTitle] = useState(track.title);

  useEffect(() => {
    setTitle(track.title);
  }, [track]);

  const onChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <input
        id={`title-${id}`}
        name={`title-${id}`}
        type="text"
        className="appearance-none bg-transparent border-none text-wht w-32 mr-3 py-1 px-2 leading-tight focus:outline-none text-center"
        onChange={onChange}
        onBlur={onBlur}
        value={title}
      />
      <FontAwesomeIcon
        className="cursor-pointer hover:scale-[1.40] text-wht"
        icon={faPen}
      />
    </>
  );
};
