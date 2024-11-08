type Props = {
  id?: string;
  width?: number;
  height?: number;
  color?: string;
};

const ThreeDotVerticalIcon = (props: Props) => {
  const { id, width = 20, height = 20, color = '#50429B' } = props;
  return (
    <svg id={id} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 18.125C8.73334 18.125 7.70834 17.1 7.70834 15.8333C7.70834 14.5667 8.73334 13.5417 10 13.5417C11.2667 13.5417 12.2917 14.5667 12.2917 15.8333C12.2917 17.1 11.2667 18.125 10 18.125ZM10 14.7917C9.42501 14.7917 8.95834 15.2583 8.95834 15.8333C8.95834 16.4083 9.42501 16.875 10 16.875C10.575 16.875 11.0417 16.4083 11.0417 15.8333C11.0417 15.2583 10.575 14.7917 10 14.7917Z"
        fill={color}
      />
      <path
        d="M10 6.45833C8.73334 6.45833 7.70834 5.43333 7.70834 4.16667C7.70834 2.9 8.73334 1.875 10 1.875C11.2667 1.875 12.2917 2.9 12.2917 4.16667C12.2917 5.43333 11.2667 6.45833 10 6.45833ZM10 3.125C9.42501 3.125 8.95834 3.59167 8.95834 4.16667C8.95834 4.74167 9.42501 5.20833 10 5.20833C10.575 5.20833 11.0417 4.74167 11.0417 4.16667C11.0417 3.59167 10.575 3.125 10 3.125Z"
        fill={color}
      />
      <path
        d="M10 12.2917C8.73334 12.2917 7.70834 11.2667 7.70834 10C7.70834 8.73333 8.73334 7.70833 10 7.70833C11.2667 7.70833 12.2917 8.73333 12.2917 10C12.2917 11.2667 11.2667 12.2917 10 12.2917ZM10 8.95833C9.42501 8.95833 8.95834 9.425 8.95834 10C8.95834 10.575 9.42501 11.0417 10 11.0417C10.575 11.0417 11.0417 10.575 11.0417 10C11.0417 9.425 10.575 8.95833 10 8.95833Z"
        fill={color}
      />
    </svg>
  );
};

export default ThreeDotVerticalIcon;
