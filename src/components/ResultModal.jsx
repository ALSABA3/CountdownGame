import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { onReset, targetTime, timeRemaining },
  ref
) {
  const userLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You Lost!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The Target Time Was <strong>{targetTime} Seconds.</strong>
      </p>
      <p>
        You Stopped The Timer With <strong>{formattedRemainingTime}</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
