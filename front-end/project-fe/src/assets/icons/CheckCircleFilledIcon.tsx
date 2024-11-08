type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const CheckCircleFilledIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0.876587C4.49 0.876587 0 5.36659 0 10.8766C0 16.3866 4.49 20.8766 10 20.8766C15.51 20.8766 20 16.3866 20 10.8766C20 5.36659 15.51 0.876587 10 0.876587ZM14.78 8.57659L9.11 14.2466C8.97 14.3866 8.78 14.4666 8.58 14.4666C8.38 14.4666 8.19 14.3866 8.05 14.2466L5.22 11.4166C4.93 11.1266 4.93 10.6466 5.22 10.3566C5.51 10.0666 5.99 10.0666 6.28 10.3566L8.58 12.6566L13.72 7.51659C14.01 7.22659 14.49 7.22659 14.78 7.51659C15.07 7.80659 15.07 8.27659 14.78 8.57659Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckCircleFilledIcon;
