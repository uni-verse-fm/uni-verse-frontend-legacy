import styles from "./DefilingText.module.css";

interface DefilingTextProps {
  value: string;
}

const DefilingText = ({ value }: DefilingTextProps) => {
  return value.length > 22 ? (
    <p className={styles.text}>{value}</p>
  ) : (
    <p className="whitespace-nowrap">{value}</p>
  );
};

export default DefilingText;
