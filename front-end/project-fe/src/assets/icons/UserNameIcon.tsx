type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const UserNameIcon = (props: Props) => {
  const { width = 24, height = 24, color = '#9F9F9F' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 12C17.6569 12 19 10.6118 19 8.89941C19 7.57476 18.1963 6.44412 17.0653 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1968 16.6325C16.8556 17.7823 15.7355 20 13.7424 20H6.25763C4.26452 20 3.14437 17.7823 4.80323 16.6325C6.29119 15.6011 8.07815 15 10 15C11.9219 15 13.7088 15.6011 15.1968 16.6325Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M18 20C19.7657 20 20.758 17.8842 19.2884 16.7873C18.8826 16.4844 18.4518 16.2203 18 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
