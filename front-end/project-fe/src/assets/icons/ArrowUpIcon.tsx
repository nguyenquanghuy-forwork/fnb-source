type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const ArrowUpIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6 13.1667C16.4417 13.1667 16.2833 13.1083 16.1583 12.9833L10.725 7.55C10.325 7.15 9.67502 7.15 9.27502 7.55L3.84168 12.9833C3.60002 13.225 3.20002 13.225 2.95835 12.9833C2.71668 12.7417 2.71668 12.3417 2.95835 12.1L8.39168 6.66667C9.27502 5.78333 10.7167 5.78333 11.6083 6.66667L17.0417 12.1C17.2833 12.3417 17.2833 12.7417 17.0417 12.9833C16.9167 13.1 16.7583 13.1667 16.6 13.1667Z"
        fill={color}
      />
    </svg>
  );
};
