import { ReactNode } from "react";
import * as rdd from "react-device-detect";

interface DeviceProps {
  children: (props: typeof rdd) => ReactNode;
}
export default function Device(props: DeviceProps) {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {props.children(rdd)}
    </div>
  );
}
