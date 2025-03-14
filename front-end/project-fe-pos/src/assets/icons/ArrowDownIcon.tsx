type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const ArrowDownIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 14C9.41668 14 8.83335 13.775 8.39168 13.3333L2.95835 7.9C2.71668 7.65833 2.71668 7.25834 2.95835 7.01667C3.20002 6.775 3.60002 6.775 3.84168 7.01667L9.27502 12.45C9.67502 12.85 10.325 12.85 10.725 12.45L16.1583 7.01667C16.4 6.775 16.8 6.775 17.0417 7.01667C17.2833 7.25834 17.2833 7.65833 17.0417 7.9L11.6083 13.3333C11.1667 13.775 10.5833 14 10 14Z"
        fill={color}
      />
    </svg>
  );
};
