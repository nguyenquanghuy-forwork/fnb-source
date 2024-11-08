type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const PlusSquareOutlinedIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#FFFFFF' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5042 4.75738C3.5 5.76159 3.5 7.37783 3.5 10.6103V14.896C3.5 18.1285 3.5 19.7448 4.5042 20.7489C5.50841 21.7532 7.12465 21.7532 10.3571 21.7532H14.6429C17.8753 21.7532 19.4916 21.7532 20.4958 20.7489C21.5 19.7448 21.5 18.1285 21.5 14.896V10.6103C21.5 7.37783 21.5 5.76159 20.4958 4.75738C19.4916 3.75317 17.8753 3.75317 14.6429 3.75317H10.3571C7.12465 3.75317 5.50841 3.75317 4.5042 4.75738ZM11.6429 7.75318V11.896H7.5V13.6103H11.6429V17.7531H13.3571V13.6103H17.5V11.896H13.3571V7.75318H11.6429Z"
        fill={color}
      />
    </svg>
  );
};

export default PlusSquareOutlinedIcon;
