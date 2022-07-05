import { faClose, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IResourcesTable } from "../../common/types";
import { InputFileName } from "./InputFileName";
import { InputPreviewFile } from "./InputPreviewFile";
import { InputTitle } from "./InputTitle";

export const ResourcesTable = (props: IResourcesTable) => (
  <DragDropContext onDragEnd={props.handleDragEnd}>
    <table className="text-gry text-sm">
      <thead>
        <tr className="text-grn border-b">
          <th />
          <th>Order</th>
          <th>Title</th>
          <th>Preview File</th>
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
            {props.resources.map((resource, index) => (
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
                        item={resource}
                        onBlur={props.handleResourceTitleChange(
                          resource,
                          index
                        )}
                      />
                    </td>
                    <td>
                      <InputPreviewFile
                        handlePreviewFileChange={props.handlePreviewFileChange(
                          resource,
                          index
                        )}
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
