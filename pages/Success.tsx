import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

function Success() {
  const { query } = useRouter();

  return (
    <div className="bg-drk flex items-center justify-center h-screen mx-2 my-2 overflow-hidden ">
      <div className="px-6 py-4 rounded-md bg-white">
        <div className="mb-2 text-xl font-bold">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-grn fa-2xl pr-2"
          />
          {query.message || "The operation was done successfully"}
        </div>
      </div>
    </div>
  );
}

export default Success;
