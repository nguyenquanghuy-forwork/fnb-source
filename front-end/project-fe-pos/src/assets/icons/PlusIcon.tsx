type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const PlusIcon = (props: Props) => {
  const { width = 24, height = 25, color = 'white' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.0042 4.51079C3 5.51501 3 7.13124 3 10.3637V14.6494C3 17.8819 3 19.4982 4.0042 20.5024C5.00841 21.5066 6.62465 21.5066 9.85714 21.5066H14.1429C17.3753 21.5066 18.9916 21.5066 19.9958 20.5024C21 19.4982 21 17.8819 21 14.6494V10.3637C21 7.13124 21 5.51501 19.9958 4.51079C18.9916 3.50659 17.3753 3.50659 14.1429 3.50659H9.85714C6.62465 3.50659 5.00841 3.50659 4.0042 4.51079ZM11.1429 7.50659V11.6494H7V13.3637H11.1429V17.5066H12.8571V13.3637H17V11.6494H12.8571V7.50659H11.1429Z"
        fill={color}
      />
    </svg>
  );
};
