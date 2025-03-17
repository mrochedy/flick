import { IoWarningOutline as ErrorIcon } from "react-icons/io5";

import "./ErrorDisplay.css";

interface Props {
  message: string;
}

function ErrorDisplay({ message }: Props) {
  return (
    <div className="error-container">
      <ErrorIcon size="8.5rem" color="#ff2c2c" />
      <p className="error-message">{message}</p>
    </div>
  );
}

export default ErrorDisplay;
