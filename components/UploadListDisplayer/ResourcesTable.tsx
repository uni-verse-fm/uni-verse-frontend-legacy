import { faClose, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { InputFileName } from "./InputFileName";

export const ResourcesTable = ({
  files,
  handleTitleChange,
  handleDeleteFile,
  handleDragEnd,
}) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <table className="text-gry text-sm">
      <thead>
        <tr className="text-grn border-b">
          <th />
          <th>Order</th>
          <th>Name</th>
          <th></th>
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
            {files.map((file, index) => (
              <Draggable key={index} draggableId={`${index}`} index>
                {(provider) => (
                  <tr
                    key={index}
                    className="h-10 hover:border-b hover:border-t"
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                  >
                    <td className="text-center" {...provider.dragHandleProps}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:scale-[1.40] text-wht"
                        icon={faGripLines}
                      />
                    </td>
                    <td className="text-center">{index}</td>
                    <td>
                      <InputFileName
                        id={index}
                        file={file}
                        onBlur={handleTitleChange(file, index)}
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
                        onClick={handleDeleteFile(index)}
                      >
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-[1.40] text-rd"
                          icon={faClose}
                        />
                      </button>
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
          </tbody>
        )}
      </Droppable>
    </table>
  </DragDropContext>
);
