import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { ResourcesTable } from "./ResourcesTable";

const UploadListDisplayer = ({ contentType, func, fileExtensions }) => {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleDeleteFile = (file) => {
    return () => {
      setFiles(files.filter((f) => f.name !== file.name));
      func(files);
    };
  };

  const handleAddFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  const handleTitleChange = (file, index) => {
    return (event) => {
      setFiles([
        ...files.slice(0, index),
        new File([file], event.target.value),
        ...files.slice(index + 1),
      ]);
    };
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(files);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setFiles(tempData);
  };

  return (
    <>
      {files.length ? (
        <ResourcesTable
          files={files}
          onFileChange={handleTitleChange}
          onFileDelete={handleDeleteFile}
          onDragEnd={handleDragEnd}
        />
      ) : (
        <div className="text-wht text-center capitalize">
          no {contentType}s uploaded
        </div>
      )}
      <button
        onClick={() => fileRef?.current.click()}
        className="justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-grn hover:bg-segrn mx-4"
      >
        add track
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-[1.40] text-wht mx-2"
          icon={faPlus}
        />
      </button>
      <input
        id="file"
        name="file-upload"
        type="file"
        ref={fileRef}
        accept={fileExtensions.accept}
        style={{ display: "none" }}
        onChange={handleAddFile}
        value=""
      />
    </>
  );
};

export default UploadListDisplayer;
