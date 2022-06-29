import { IDefilingText } from "../../common/types";
import styles from "./DefilingText.module.css";

const DefilingText = ({ value }: IDefilingText) =>
  value.length > 22 ? (
    <p className={styles.text}>{value}</p>
  ) : (
    <p className="whitespace-nowrap">{value}</p>
  );

export default DefilingText;
