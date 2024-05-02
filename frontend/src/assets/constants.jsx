import { useColorMode } from "@chakra-ui/react";

export const CatholicLogo = () => {
  const { colorMode } = useColorMode();
  const fillColor = colorMode === "light" ? "black" : "white";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 100"
      width="50"
      height="100"
    >
      {/* Thân thánh giá */}
      <rect x="20" y="10" width="10" height="80" fill={fillColor} />
      {/* Thanh ngang */}
      <rect x="5" y="40" width="40" height="10" fill={fillColor} />
    </svg>
  );
};

export const CatholicMobileLogo = () => {
  const { colorMode } = useColorMode();
  const fillColor = colorMode === "light" ? "black" : "white";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      {/* Thân thánh giá */}
      <rect x="8" y="4" width="8" height="16" fill={fillColor} />
      {/* Thanh ngang */}
      <rect x="3" y="10" width="18" height="4" fill={fillColor} />
    </svg>
  );
};
{
  /* <title>Catholic Social Network Mobile Logo</title> */
}
export const SearchLogo = () => (
  <svg
    aria-label="Search"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="16.511"
      x2="22"
      y1="16.511"
      y2="22"
    ></line>
  </svg>
);
export const ReelsLogo = () => (
  <svg
    aria-label="Reels"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="2.049"
      x2="21.95"
      y1="7.002"
      y2="7.002"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="13.504"
      x2="16.362"
      y1="2.001"
      y2="7.002"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="7.207"
      x2="10.002"
      y1="2.11"
      y2="7.002"
    ></line>
    <path
      d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <path
      d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const MessagesLogo = () => (
  <svg
    aria-label="Messenger"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.739"
    ></path>
    <path
      d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const ChatLogo = () => (
  <svg
    aria-label="Notifications"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M21,3H3C2.45,3,2,3.45,2,4v16c0,0.55,0.45,1,1,1h16l4,4V4C22,3.45,21.55,3,21,3z M20,17H6c-0.55,0-1-0.45-1-1V6 c0-0.55,0.45-1,1-1h14V17z"></path>
  </svg>
);

export const UnlikeLogo = () => (
  <svg
    aria-label="Unlike"
    color="rgb(255, 48, 64)"
    fill="rgb(255, 48, 64)"
    height="24"
    role="img"
    viewBox="0 0 48 48"
    width="24"
  >
    <title>Unlike</title>
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

export const CreatePostLogo = () => (
  <svg
    aria-label="New post"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="6.545"
      x2="17.455"
      y1="12.001"
      y2="12.001"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12.003"
      x2="12.003"
      y1="6.545"
      y2="17.455"
    ></line>
  </svg>
);

export const CommentLogo = () => (
  <svg
    aria-label="Comment"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Comment</title>
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
