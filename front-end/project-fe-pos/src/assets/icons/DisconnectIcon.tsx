type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const DisconnectIcon = (props: Props) => {
  const { width = 16, height = 16, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7478 8.42885L14.2367 5.93995C14.7793 5.39432 15.0838 4.6561 15.0838 3.88661C15.0838 3.11711 14.7793 2.3789 14.2367 1.83327V1.79179C13.9669 1.51483 13.6444 1.29471 13.2882 1.14441C12.9319 0.994106 12.5492 0.916672 12.1626 0.916672C11.776 0.916672 11.3932 0.994106 11.037 1.14441C10.6808 1.29471 10.3583 1.51483 10.0885 1.79179L7.59961 4.28069"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.42917 11.7474L5.94027 14.2363C5.39464 14.7789 4.65642 15.0835 3.88693 15.0835C3.11744 15.0835 2.37922 14.7789 1.83359 14.2363H1.79211C1.51515 13.9665 1.29503 13.644 1.14473 13.2878C0.994426 12.9316 0.916992 12.5488 0.916992 12.1622C0.916992 11.7756 0.994426 11.3929 1.14473 11.0366C1.29503 10.6804 1.51515 10.3579 1.79211 10.0881L4.28101 7.59923"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.86621 3.86588L12.1625 12.1622"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
