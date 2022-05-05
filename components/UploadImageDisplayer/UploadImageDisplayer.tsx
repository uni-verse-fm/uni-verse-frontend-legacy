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
      <div className="md:h-60 md:w-60 m-8">
        <img
          src={image ? URL.createObjectURL(image) : urlImage}
          className=" md:container md:mx-auto rounded"
        />
        <div className="text-center">
          <div className="flex justify-center mt-2">
            <div>
              <label className="px-4 border border-transparent shadow-sm text-md font-medium inline-block rounded-md text-white bg-grn hover:bg-segrn mx-4">
                <span>upload</span>
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
            </div>
            {image && (
              <div>
                <button
                  className="px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-rd hover:bg-serd mx-4"
                  onClick={() => handleDeleteFile()}
                >
                  delete
                </button>
              </div>
            )}
          </div>
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
