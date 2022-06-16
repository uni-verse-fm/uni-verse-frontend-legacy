import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IFeat, ITrack } from "../../common/types";
import { TracksTable } from "./TracksTable";

const UploadTracksListDisplayer = (props) => {
  const [tracks, setTracks] = useState<ITrack[]>([]);

  const handleDeleteTrack = (index: number) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    return (): void => {
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    };
  };

  const handleAddTrack = (event: any): void => {
    const file = event.target.files[0];
    if (file) {
      const newTracks = [
        ...tracks,
        { file, title: `Track-${tracks.length}`, feats: [] },
      ];
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    }
  };

  const handleTrackTitleChange =
    (track: ITrack, index: number) =>
    (event: any): void => {
      const value = event.target.value;
      const newTracks = [
        ...tracks.slice(0, index),
        {
          ...track,
          title: value ? value : `Track-${index}`,
        },
        ...tracks.slice(index + 1),
      ];
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    };

  const handleTrackFileNameChange =
    (track: ITrack, index: number) => (event: any) => {
      const newTracks = [
        ...tracks.slice(0, index),
        {
          ...track,
          file: new File([track.file], event.target.value),
        },
        ...tracks.slice(index + 1),
      ];
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    };

  const handleAddTrackFeat =
    (track: ITrack, index: number) => (feat: IFeat) => {
      let newTracks: ITrack[] = tracks;
      if (track.feats.filter((f) => f.id === feat.id).length === 0) {
        newTracks = [
          ...tracks.slice(0, index),
          {
            ...track,
            feats: [
              ...track.feats,
              { id: feat.id, username: feat.username, email: feat.email },
            ],
          },
          ...tracks.slice(index + 1),
        ];
      }
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
    };

  const handleDeleteTrackFeat =
    (track: ITrack, index: number) => (featIndex: number) => {
      const newTracks = [
        ...tracks.slice(0, index),
        {
          ...track,
          feats: [
            ...track.feats.slice(0, featIndex),
            ...track.feats.slice(featIndex + 1),
          ],
        },
        ...tracks.slice(index + 1),
      ];
      setTracks(newTracks);
      props.setFieldValue(props.field.name, newTracks);
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
        <TracksTable
          tracks={tracks}
          handleTrackTitleChange={handleTrackTitleChange}
          handleAddFeat={handleAddTrackFeat}
          handleDeleteFeat={handleDeleteTrackFeat}
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
          id="track-file"
          name="track-file-upload"
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

export default UploadTracksListDisplayer;
