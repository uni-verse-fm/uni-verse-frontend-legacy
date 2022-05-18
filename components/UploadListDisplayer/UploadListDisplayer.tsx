import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ResourcesTable } from "./ResourcesTable";

export interface ITrack {
  file: File;
  title: string;
}

const UploadListDisplayer = (props) => {
  const [tracks, setTracks] = useState<ITrack[]>([]);

  const handleDeleteTrack = (index) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    return () => {
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    };
  };

  const handleAddTrack = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newTracks = [...tracks, { file, title: `Track-${tracks.length}` }];
      setTracks(newTracks);
      props.setFieldValue(
        props.field.name,
        newTracks
      );
    }
  };

  const handleTrackTitleChange = (track, index) => {
    return (event) => {
        const value = event.target.value;
      const newTracks = [
        ...tracks.slice(0, index),
        {
          file: track.file,
          title: value ? value : `Track-${index}`,
        },
        ...tracks.slice(index + 1),
      ];
      setTracks(newTracks);
      props.setFieldValue(
        props.field.name,
        newTracks
      );
    };
  };

  const handleTrackFileNameChange = (track, index) => {
    return (event) => {
      const newTracks = [
        ...tracks.slice(0, index),
        {
          file: new File([track.file], event.target.value),
          title: track.title,
        },
        ...tracks.slice(index + 1),
      ];
      setTracks(newTracks);
      props.setFieldValue(
        props.field.name,
        newTracks
      );
    };
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(tracks);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setTracks(tempData);
  };

  return (
    <>
      {tracks.length ? (
        <ResourcesTable
          tracks={tracks}
          handleTrackTitleChange={handleTrackTitleChange}
          handleTrackFileNameChange={handleTrackFileNameChange}
          handleDeleteFile={handleDeleteTrack}
          handleDragEnd={handleDragEnd}
        />
      ) : (
        <div className="text-wht text-center capitalize">
          no {props.contentType}s uploaded
        </div>
      )}
      <label className="px-4 border border-transparent shadow-sm text-md font-medium inline-block rounded-md text-white bg-grn hover:bg-segrn mx-4">
        <span>
          Add track
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
          onChange={handleAddTrack}
          value=""
          className="sr-only"
        />
      </label>
    </>
  );
};

export default UploadListDisplayer;
