import { forwardRef } from "react";

const LinkWrapper = forwardRef((props: any, ref) => {
  return (
    <a ref={ref} {...props}>
      {props.children}
    </a>
  );
});

LinkWrapper.displayName = "LinkWrapper";

export default LinkWrapper;
