import { faClose, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { InputFeats } from "./InputFeats";
import { InputFileName } from "./InputFileName";
import { InputTitle } from "./InputTitle";
import { IFeat, ITrack } from "./UploadTracksListDisplayer";

interface TracksTableProps {
  tracks: ITrack[];
  handleTrackTitleChange: (
    track: ITrack,
    index: number
  ) => (event: any) => void;
  handleAddFeat: (track: ITrack, index: number) => (feat: IFeat) => void;
  handleDeleteFeat: (track: ITrack, index: number) => (index: number) => void;
  handleTrackFileNameChange: (
    track: ITrack,
    index: number
  ) => (event: any) => void;
  handleDeleteFile: (index: number) => () => void;
  handleDragEnd;
}
export const TracksTable = (props: TracksTableProps) => (
  <DragDropContext onDragEnd={props.handleDragEnd}>
    <table className="text-gry text-sm">
      <thead>
        <tr className="text-grn border-b">
          <th />
          <th>Order</th>
          <th>Title</th>
          <th>Name</th>
          <th>feats</th>
          <th />
        </tr>
      </thead>
      <Droppable droppableId="droppable-1">
        {(provider) => (
          <tbody
            className="text-capitalize"
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {props.tracks.map((track, index) => (
              <Draggable key={index} draggableId={`${index}`} index={index}>
                {(provider) => (
                  <tr
                    key={index}
                    className="h-10 hover:border-b hover:border-t"
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                  >
                    <td className="text-center" {...provider.dragHandleProps}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:scale-[1.40] text-wht w-fit"
                        icon={faGripLines}
                      />
                    </td>
                    <td className="text-center">{index}</td>
                    <td>
                      <InputTitle
                        id={index}
                        track={track}
                        onBlur={props.handleTrackTitleChange(track, index)}
                      />
                    </td>
                    <td>
                      <InputFileName
                        id={index}
                        track={track}
                        onBlur={props.handleTrackFileNameChange(track, index)}
                      />
                    </td>
                    <td>
                      <InputFeats
                        track={track}
                        handleAddFeat={props.handleAddFeat(track, index)}
                        handleDeleteFeat={props.handleDeleteFeat(track, index)}
                      />
                    </td>
                    <td>
                      <button
                        style={{
                          float: "left",
                          marginLeft: "2%",
                          marginTop: "1%",
                          marginBottom: "1%",
                          textAlign: "center",
                        }}
                        onClick={props.handleDeleteFile(index)}
                      >
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-[1.40] text-rd ml-3"
                          icon={faClose}
                        />
                      </button>
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </tbody>
        )}
      </Droppable>
    </table>
  </DragDropContext>
);
