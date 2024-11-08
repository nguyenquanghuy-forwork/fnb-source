type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const LockIcon = (props: Props) => {
  const { width = 22, height = 22, color = '#9F9F9F' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 9V7C5 3.69 6 1 11 1C16 1 17 3.69 17 7V9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17.5C12.3807 17.5 13.5 16.3807 13.5 15C13.5 13.6193 12.3807 12.5 11 12.5C9.61929 12.5 8.5 13.6193 8.5 15C8.5 16.3807 9.61929 17.5 11 17.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H6C2 21 1 20 1 16V14C1 10 2 9 6 9H16C20 9 21 10 21 14V16C21 20 20 21 16 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
