import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UploadImageDisplayer = ({
  image,
  onDelete,
  onChange,
  fileExtensions,
  maxFileSize,
}) => {
  const urlImage = "https://i.ibb.co/K984Tcf/Play-List-img.png";

  const handleDeleteFile = () => {
    onDelete(null);
  };

  const handleImageChange = (event) => {
    let image = event.target.files[0];
    if (image) {
      onChange(image);
    }
  };

  return (
    <>
      <div className="relative md:h-60 md:w-60 m-8">
        <img
          src={image ? URL.createObjectURL(image) : urlImage}
          className=" md:container md:mx-auto rounded"
        />
        {image && (
          <button
            className="absolute top-0 right-0 m-2"
            onClick={() => handleDeleteFile()}
          >
            <FontAwesomeIcon
              className="cursor-pointer hover:scale-[1.40] text-rd"
              icon={faClose}
            />
          </button>
        )}
        <div className="text-center">
          <label className="px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-grn hover:bg-segrn mx-4">
            <span>Upload a file</span>
            <input
              id="image-upload"
              name="image-upload"
              type="file"
              accept={fileExtensions.accept}
              onChange={handleImageChange}
              value=""
              className="sr-only"
            />
          </label>
          <p className="text-xs text-grn m-4">
            {fileExtensions.extensions.join(", ")} up to {maxFileSize}
            MB
          </p>
        </div>
      </div>
    </>
  );
};

export default UploadImageDisplayer;
