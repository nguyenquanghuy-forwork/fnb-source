type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const VNFlagIcon = (props: Props) => {
  const { width = 18, height = 18 } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 17.4375C13.6599 17.4375 17.4375 13.6599 17.4375 9C17.4375 4.3401 13.6599 0.5625 9 0.5625C4.3401 0.5625 0.5625 4.3401 0.5625 9C0.5625 13.6599 4.3401 17.4375 9 17.4375Z"
        fill="#F42F4C"
      />
      <path
        d="M9 10.9688L11.7844 12.9375L10.7438 9.73125L13.5 7.65H10.0687L9 4.5L7.95937 7.65H4.5L7.25625 9.73125L6.21563 12.9375L9 10.9688Z"
        fill="#FFE62E"
      />
    </svg>
  );
};
