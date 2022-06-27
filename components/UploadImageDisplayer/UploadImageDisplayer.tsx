import { useState } from "react";

const UploadImageDisplayer = (props) => {
  const [image, setImage] = useState(null);

  const handleDeleteFile = () => {
    setImage(null);
    props?.field
      ? props.setFieldValue(props?.field?.name || "random", null)
      : props.setFieldValue(null);
  };

  const handleImageChange = (event) => {
    let image: File = event.target.files[0];
    if (image) {
      props?.field
        ? props.setFieldValue(props?.field?.name || "random", image)
        : props.setFieldValue(image);
      setImage(image);
    }
  };

  return (
    <>
      <div
        className={`md:container h-${props.size || 56} w-${props.size || 56}`}
      >
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : props.profilePicture || props.defaultImageSrc
          }
          className={`md:mx-auto object-contain h-${props.size || 56} w-${
            props.size || 56
          } rounded-lg`}
          alt="image to upload"
        />
      </div>
      <div className="text-center">
        <div className="flex justify-center mt-2">
          <div>
            <label
              className={`${
                !props.disable && image ? "rounded-l-md" : "rounded-md"
              } px-4 border border-transparent shadow-sm text-md font-medium inline-block text-white bg-grn hover:bg-segrn`}
            >
              <span>Upload</span>
              <input
                id="image-upload"
                name="image-upload"
                type="file"
                accept={props.fileExtensions.accept}
                onChange={handleImageChange}
                value=""
                className="sr-only"
              />
            </label>
          </div>
          {!props.disable && image && (
            <div>
              <button
                className="px-4 border border-transparent shadow-sm text-md font-medium rounded-r-md text-white bg-rd hover:bg-serd"
                onClick={() => handleDeleteFile()}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-grn text-center m-1">
        {props.fileExtensions.extensions.join(", ")} up to {props.maxFileSize}
        MB
      </p>
    </>
  );
};

export default UploadImageDisplayer;
