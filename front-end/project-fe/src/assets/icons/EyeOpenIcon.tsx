type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const EyeOpenIcon = (props: Props) => {
  const { width = 20, height = 20, color = '#9F9F9F' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.1083 7.89166L7.8916 12.1083C7.34994 11.5667 7.0166 10.825 7.0166 10C7.0166 8.35 8.34993 7.01666 9.99993 7.01666C10.8249 7.01666 11.5666 7.35 12.1083 7.89166Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8499 4.80834C13.3915 3.70834 11.7249 3.10834 9.99987 3.10834C7.0582 3.10834 4.31654 4.84167 2.4082 7.84167C1.6582 9.01667 1.6582 10.9917 2.4082 12.1667C3.06654 13.2 3.8332 14.0917 4.66654 14.8083"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.0166 16.275C7.9666 16.675 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1583 17.5916 12.1583C18.3416 10.9833 18.3416 9.00834 17.5916 7.83334C17.3166 7.4 17.0166 6.99167 16.7083 6.60834"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9247 10.5833C12.708 11.7583 11.7497 12.7166 10.5747 12.9333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
