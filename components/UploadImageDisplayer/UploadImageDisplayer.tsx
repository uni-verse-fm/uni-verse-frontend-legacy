import { useState } from "react";
import Image from "next/image";

const UploadImageDisplayer = (props) => {
  const [image, setImage] = useState(null);

  const handleDeleteFile = () => {
    setImage(null);
    props.setFieldValue(props.field.name, null);
  };

  const handleImageChange = (event) => {
    let image = event.target.files[0];
    if (image) {
      props.setFieldValue(props.field.name, image);
      setImage(image);
    }
  };

  return (
    <>
        <Image
          src={image ? URL.createObjectURL(image) : props.defaultImageSrc}
          width={props?.size || 250}
          height={props?.size || 250}
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
                  accept={props.fileExtensions.accept}
                  onChange={handleImageChange}
                  value=""
                  className="sr-only"
                />
              </label>
            </div>
            {image && (
              <div>
                <button
                  className="px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-gryf bg-rd hover:bg-serd mx-4"
                  onClick={() => handleDeleteFile()}
                >
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-grn m-1">
          {props.fileExtensions.extensions.join(", ")} up to {props.maxFileSize}
          MB
        </p>
    </>
  );
};

export default UploadImageDisplayer;
