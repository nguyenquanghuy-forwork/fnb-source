type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const CloseOutlinedIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.4 7.61329C23.88 7.09329 23.04 7.09329 22.52 7.61329L16 14.12L9.47996 7.59996C8.95996 7.07996 8.11996 7.07996 7.59996 7.59996C7.07996 8.11996 7.07996 8.95996 7.59996 9.47996L14.12 16L7.59996 22.52C7.07996 23.04 7.07996 23.88 7.59996 24.4C8.11996 24.92 8.95996 24.92 9.47996 24.4L16 17.88L22.52 24.4C23.04 24.92 23.88 24.92 24.4 24.4C24.92 23.88 24.92 23.04 24.4 22.52L17.88 16L24.4 9.47996C24.9066 8.97329 24.9066 8.11996 24.4 7.61329Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseOutlinedIcon;
