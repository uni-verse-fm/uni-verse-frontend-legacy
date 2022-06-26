import {
  faChevronDown,
  faChevronUp,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { useState } from "react";

function Error() {
  const [showError, setShowError] = useState(false);
  const {
    query: { message, error },
  } = router;

  return (
    <div className="bg-drk flex items-center justify-center h-screen mx-2 my-2 overflow-hidden ">
      <div className="px-6 py-4 rounded-md bg-white">
        <div className="mb-2 text-xl font-bold">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-rd fa-2xl pr-2"
          />
          {message || "Sorry can not complete checkout"}
          <FontAwesomeIcon
            icon={showError ? faChevronUp : faChevronDown}
            className="text-gry ml-4"
            onClick={() => setShowError(!showError)}
          />
        </div>
        {showError && error}
      </div>
    </div>
  );
}

export default Error;
