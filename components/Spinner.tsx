import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className="mr-2 motion-safe:animate-spin text-grn fa-3x"
    />
  );
};
export default Spinner;
