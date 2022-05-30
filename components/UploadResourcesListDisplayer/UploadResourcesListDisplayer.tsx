import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ResourcesTable } from "./ResourcesTable";

export interface IResource {
  file: File;
  previewFile?: File;
  title: string;
}

const UploadResourcesListDisplayer = (props) => {
  const [resources, setResources] = useState<IResource[]>([]);

  const handleDeleteResource = (index: number) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    return (): void => {
      setResources(newResources);
      props.setFieldValue(props.field.name, newResources);
    };
  };

  const handleAddResource = (event: any): void => {
    const file = event.target.files[0];
    if (file) {
      const newResources = [
        ...resources,
        { file, title: `Resource-${resources.length}`, feats: [] },
      ];
      setResources(newResources);
      props.setFieldValue(props.field.name, newResources);
    }
  };

  const handleResourceTitleChange =
    (resource: IResource, index: number) =>
    (event: any): void => {
      const value = event.target.value;
      const newResources = [
        ...resources.slice(0, index),
        {
          ...resource,
          title: value ? value : `Resource-${index}`,
        },
        ...resources.slice(index + 1),
      ];
      setResources(newResources);
      props.setFieldValue(props.field.name, newResources);
    };

  const handleResourceFileNameChange =
    (resource: IResource, index: number) => (event: any) => {
      const newResources = [
        ...resources.slice(0, index),
        {
          ...resource,
          file: new File([resource.file], event.target.value),
        },
        ...resources.slice(index + 1),
      ];
      setResources(newResources);
      props.setFieldValue(props.field.name, newResources);
    };

  const handleResourcePreviewChange =
    (resource: IResource, index: number) => (previewFile: File) => {
      const newResources = [
        ...resources.slice(0, index),
        {
          ...resource,
          previewFile,
        },
        ...resources.slice(index + 1),
      ];
      setResources(newResources);
      props.setFieldValue(props.field.name, newResources);
    };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(resources);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setResources(tempData);
  };

  return (
    <>
      {resources.length ? (
        <ResourcesTable
          resources={resources}
          handleResourceTitleChange={handleResourceTitleChange}
          handleResourceFileNameChange={handleResourceFileNameChange}
          handleDeleteFile={handleDeleteResource}
          handleDragEnd={handleDragEnd}
          handlePreviewFileChange={handleResourcePreviewChange}
        />
      ) : (
        <div className="text-wht text-center capitalize">
          no {props.contentType}s uploaded
        </div>
      )}
      <label className="px-4 border border-transparent shadow-sm text-md font-medium inline-block rounded-md text-white bg-grn hover:bg-segrn mx-4">
        <span>
          Add resource
          <FontAwesomeIcon
            className="cursor-pointer hover:scale-[1.40] text-wht mx-2"
            icon={faPlus}
          />
        </span>
        <input
          id="resource-file"
          name="resource-file-upload"
          type="file"
          accept={props.fileExtensions.accept}
          style={{ display: "none" }}
          onChange={handleAddResource}
          value=""
          className="sr-only"
        />
      </label>
    </>
  );
};

export default UploadResourcesListDisplayer;
