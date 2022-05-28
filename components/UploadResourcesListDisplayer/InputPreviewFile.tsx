import { useState } from "react";
import { Extensions } from "../../common/constants";

export const InputPreviewFile = (props) => {
  const [previewFile, setPreviewFile] = useState(null);

  const handleDeleteFile = () => {
    setPreviewFile(null);
    props.handlePreviewFileChange(null);
  };

  const handlePreviewFileChange = (event) => {
    let previewFile = event.target.files[0];
    if (previewFile) {
      props.handlePreviewFileChange(previewFile);
      setPreviewFile(previewFile);
    }
  };

  return (
    <div className="flex justify-center">
      {previewFile && (
        <div className="text-md group text-white px-2">
          {previewFile?.name}
        </div>
      )}
      <div>
        <label
          className={`${
            previewFile ? "rounded-l-md" : "rounded-md"
          } px-1 border border-transparent shadow-sm text-md font-medium inline-block text-black bg-grn hover:bg-segrn`}
        >
          <span>Upload</span>
          <input
            id="resource-file"
            name="resource-file-upload"
            type="file"
            accept={Extensions.audio.accept}
            onChange={handlePreviewFileChange}
            value=""
            className="sr-only"
          />
        </label>
      </div>
      {previewFile && (
        <div>
          <button
            className="px-1 border border-transparent shadow-sm text-md font-medium rounded-r-md text-white bg-rd hover:bg-serd"
            onClick={() => handleDeleteFile()}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
