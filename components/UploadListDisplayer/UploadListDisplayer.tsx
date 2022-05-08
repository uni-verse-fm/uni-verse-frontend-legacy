import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ResourcesTable } from "./ResourcesTable";

const UploadListDisplayer = (props) => {
  const [files, setFiles] = useState([]);

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1)
    return () => {
      setFiles(newFiles);
      props.setFieldValue(props.field.name, newFiles);
    };
  };

  const handleAddFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFiles = [...files, file];
      setFiles(newFiles);
      props.setFieldValue(props.field.name, newFiles);
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
          handleTitleChange={handleTitleChange}
          handleDeleteFile={handleDeleteFile}
          handleDragEnd={handleDragEnd}
        />
      ) : (
        <div className="text-wht text-center capitalize">
          no {props.contentType}s uploaded
        </div>
      )}
      <label className="px-4 border border-transparent shadow-sm text-md font-medium inline-block rounded-md text-white bg-grn hover:bg-segrn mx-4">
        <span>
          add track
          <FontAwesomeIcon
            className="cursor-pointer hover:scale-[1.40] text-wht mx-2"
            icon={faPlus}
          />
        </span>
        <input
          id="file"
          name="file-upload"
          type="file"
          accept={props.fileExtensions.accept}
          style={{ display: "none" }}
          onChange={handleAddFile}
          value=""
          className="sr-only"
        />
      </label>
    </>
  );
};

export default UploadListDisplayer;
