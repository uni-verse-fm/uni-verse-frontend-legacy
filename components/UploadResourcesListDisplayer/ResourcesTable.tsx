import {
  faClose,
  faGripLines,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerificationSessionResult } from "@stripe/stripe-js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Extensions } from "../../common/constants";
import { InputFileName } from "./InputFileName";
import { InputPreviewFile } from "./InputPreviewFile";
import { InputTitle } from "./InputTitle";
import { IResource } from "./UploadResourcesListDisplayer";

interface ResourcesTableProps {
  resources: IResource[];
  handleResourceTitleChange: (
    resource: IResource,
    index: number
  ) => (event: any) => void;
  handleResourceFileNameChange: (
    resource: IResource,
    index: number
  ) => (event: any) => void;
  handlePreviewFileChange: (
    resource: IResource,
    index: number
  ) => (previewFile: File) => void;
  handleDeleteFile: (index: number) => () => void;
  handleDragEnd;
}

export const ResourcesTable = (props: ResourcesTableProps) => (
  <DragDropContext onDragEnd={props.handleDragEnd}>
    <table className="text-gry text-sm">
      <thead>
        <tr className="text-grn border-b">
          <th />
          <th>Order</th>
          <th>Title</th>
          <th>Name</th>
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
                      <InputFileName
                        id={index}
                        item={resource}
                        onBlur={props.handleResourceFileNameChange(
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
                      {/* <div className="flex justify-center mt-2">
                        <div>
                          <label
                            className={`${
                              image ? "rounded-l-md" : "rounded-md"
                            } px-4 border border-transparent shadow-sm text-md font-medium inline-block text-white bg-grn hover:bg-segrn`}
                          >
                            <span>Upload</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              accept={Extensions.audio.accept}
                              onChange={handleImageChange}
                              value=""
                              className="sr-only"
                            />
                          </label>
                        </div>
                        {image && (
                          <div>
                            <button
                              className="px-4 border border-transparent shadow-sm text-md font-medium rounded-r-md text-white bg-rd hover:bg-serd"
                              onClick={() => handleDeleteFile()}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      {
                        "////////////////////////////////////////////////////////////"
                      }
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
                          accept={Extensions.audio.accept}
                          style={{ display: "none" }}
                          onChange={() => ""}
                          value=""
                          className="sr-only"
                        />
                      </label> */}
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
