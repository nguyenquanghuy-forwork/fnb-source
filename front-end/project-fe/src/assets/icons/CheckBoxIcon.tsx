type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const CheckBoxIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#8B8899' } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path
        d="M12.25 18.125H7.75C3.63333 18.125 1.875 16.3667 1.875 12.25V7.75C1.875 3.63333 3.63333 1.875 7.75 1.875H12.25C16.3667 1.875 18.125 3.63333 18.125 7.75V12.25C18.125 16.3667 16.3667 18.125 12.25 18.125ZM7.75 3.125C4.33333 3.125 3.125 4.33333 3.125 7.75V12.25C3.125 15.6667 4.33333 16.875 7.75 16.875H12.25C15.6667 16.875 16.875 15.6667 16.875 12.25V7.75C16.875 4.33333 15.6667 3.125 12.25 3.125H7.75Z"
        fill={color}
      />
    </svg>
  );
};
