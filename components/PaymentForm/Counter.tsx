import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = ({ amount, setAmount }) => {
  const buttonUp = (event: any) => {
    const value = amount || 0;
    setAmount(value + 1);
  };

  const buttonDown = (event: any) => {
    amount - 1 > 0 ? setAmount(amount - 1) : setAmount(amount);
  };

  const inputOnChange = (event: any) => {
    setAmount(event.target.valueAsNumber);
  };

  const inputOnBlur = (event: any) => {
    setAmount(Number.isNaN(amount) ? 1 : amount);
  };

  return (
    <div className="flex broder-2 border-grn my-2 shrink">
      <button className="bg-grn rounded-l-md" onClick={buttonDown}>
        <FontAwesomeIcon icon={faArrowLeft} className="px-1" />
      </button>
      <input
        type="number"
        id="amount"
        min="1"
        max="999"
        className="w-12 px-2 text-center"
        placeholder="1"
        value={amount}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
      />
      <button className="bg-grn rounded-r-md" onClick={buttonUp}>
        <FontAwesomeIcon icon={faArrowRight} className="px-1" />
      </button>
      <span className="ml-2 text-grn">Choose the amount to donate</span>
    </div>
  );
};

export default Counter;
