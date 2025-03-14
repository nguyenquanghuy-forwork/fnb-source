type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const ArrowLeftIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path
        d="M12.4999 17.225C12.3416 17.225 12.1832 17.1667 12.0582 17.0417L6.6249 11.6084C5.74157 10.725 5.74157 9.27502 6.6249 8.39168L12.0582 2.95835C12.2999 2.71668 12.6999 2.71668 12.9416 2.95835C13.1832 3.20002 13.1832 3.60002 12.9416 3.84168L7.50824 9.27502C7.10824 9.67502 7.10824 10.325 7.50824 10.725L12.9416 16.1583C13.1832 16.4 13.1832 16.8 12.9416 17.0417C12.8166 17.1583 12.6582 17.225 12.4999 17.225Z"
        fill={color}
      />
    </svg>
  );
};
