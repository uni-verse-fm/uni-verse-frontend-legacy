import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = (props) => {
  const buttonUp = (event: any) => {
    const value = props.amount || 0;
    props.field?.name
      ? props.setAmount(props.field?.name, value + 1)
      : props.setAmount(value + 1);
  };

  const buttonDown = (event: any) => {
    const value = props.amount - 1 > 0 ? props.amount - 1 : props.amount;
    props.field?.name
      ? props.setAmount(props.field?.name, value)
      : props.setAmount(value);
  };

  const inputOnChange = (event: any) => {
    props.setAmount(event.target.valueAsNumber);
  };

  const inputOnBlur = (event: any) => {
    props.setAmount(Number.isNaN(props.amount) ? 1 : props.amount);
  };

  return (
    <div className="flex broder-2 border-grn my-2 shrink">
      <button
        className="bg-grn rounded-l-md"
        onClick={buttonDown}
        type="button"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="px-1" />
      </button>
      <input
        type="number"
        id="amount"
        min="1"
        max="999"
        className="w-12 px-2 text-center"
        placeholder="1"
        value={props.amount}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
      />
      <button className="bg-grn rounded-r-md" onClick={buttonUp} type="button">
        <FontAwesomeIcon icon={faArrowRight} className="px-1" />
      </button>
    </div>
  );
};

export default Counter;
