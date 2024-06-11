import { FunctionComponent } from "react";
import { IconProps } from "../utils";

const PencilIcon: FunctionComponent<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#D99E82"
        d="M35.222 33.598c-.647-2.101-1.705-6.059-2.325-7.566-.501-1.216-.969-2.438-1.544-3.014-.575-.575-1.553-.53-2.143.058 0 0-2.469 1.675-3.354 2.783-1.108.882-2.785 3.357-2.785 3.357-.59.59-.635 1.567-.06 2.143.576.575 1.798 1.043 3.015 1.544 1.506.62 5.465 1.676 7.566 2.325.359.11 1.74-1.271 1.63-1.63z"
      />
      <path
        fill="#EA596E"
        d="M13.643 5.308c1.151 1.151 1.151 3.016 0 4.167l-4.167 4.168c-1.151 1.15-3.018 1.15-4.167 0L1.141 9.475c-1.15-1.151-1.15-3.016 0-4.167l4.167-4.167c1.15-1.151 3.016-1.151 4.167 0l4.168 4.167z"
      />
      <path
        fill="#FFCC4D"
        d="M31.353 23.018l-4.17 4.17-4.163 4.165L7.392 15.726l8.335-8.334 15.626 15.626z"
      />
      <path
        fill="#292F33"
        d="M32.078 34.763s2.709 1.489 3.441.757c.732-.732-.765-3.435-.765-3.435s-2.566.048-2.676 2.678z"
      />
      <path
        fill="#CCD6DD"
        d="M2.183 10.517l8.335-8.335 5.208 5.209-8.334 8.335z"
      />
      <path
        fill="#99AAB5"
        d="M3.225 11.558l8.334-8.334 1.042 1.042L4.267 12.6zm2.083 2.086l8.335-8.335 1.042 1.042-8.335 8.334z"
      />
    </svg>
  );
};

export default PencilIcon;
