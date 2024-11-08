type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const DisconnectOutlinedIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.7478 10.4288L16.2367 7.93994C16.7793 7.3943 17.0838 6.65609 17.0838 5.88659C17.0838 5.1171 16.7793 4.37889 16.2367 3.83325V3.79177C15.9669 3.51481 15.6444 3.29469 15.2882 3.14439C14.9319 2.99409 14.5492 2.91666 14.1626 2.91666C13.776 2.91666 13.3932 2.99409 13.037 3.14439C12.6808 3.29469 12.3583 3.51481 12.0885 3.79177L9.59961 6.28067"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4292 13.7474L7.94027 16.2363C7.39464 16.7789 6.65642 17.0834 5.88693 17.0834C5.11744 17.0834 4.37922 16.7789 3.83359 16.2363H3.79211C3.51515 15.9665 3.29503 15.644 3.14473 15.2878C2.99443 14.9315 2.91699 14.5488 2.91699 14.1622C2.91699 13.7756 2.99443 13.3928 3.14473 13.0366C3.29503 12.6804 3.51515 12.3579 3.79211 12.0881L6.28101 9.59921"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.86621 5.86584L14.1625 14.1622"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DisconnectOutlinedIcon;
