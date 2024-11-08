type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const TikTokIcon = (props: Props) => {
  const { width = 18, height = 21 } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.03177 8.38178V7.60119C6.76388 7.56457 6.49198 7.54199 6.21455 7.54199C2.87094 7.54199 0.150391 10.2625 0.150391 13.6067C0.150391 15.6585 1.1753 17.474 2.7395 18.5717C1.73014 17.4881 1.11108 16.0367 1.11108 14.4424C1.11108 11.1465 3.75437 8.45854 7.03227 8.38178H7.03177Z"
        fill="#25F4EE"
      />
      <path
        d="M7.17465 17.2121C8.66661 17.2121 9.88366 16.0252 9.93884 14.5468L9.94436 1.34287H12.3564C12.3062 1.07147 12.2786 0.792543 12.2786 0.506592H8.98417L8.97865 13.7105C8.92347 15.1889 7.70642 16.3759 6.21446 16.3759C5.75092 16.3759 5.31397 16.26 4.92969 16.0578C5.43286 16.7556 6.25058 17.2121 7.17465 17.2121Z"
        fill="#25F4EE"
      />
      <path
        d="M16.8625 5.82425V5.09031C15.9425 5.09031 15.0851 4.8169 14.3662 4.34784C15.0063 5.08278 15.8757 5.61305 16.8625 5.82425Z"
        fill="#25F4EE"
      />
      <path
        d="M14.3671 4.34784C13.6658 3.54266 13.2399 2.49167 13.2399 1.34235H12.3574C12.5897 2.59752 13.3347 3.6746 14.3671 4.34784Z"
        fill="#FE2C55"
      />
      <path
        d="M6.21502 10.8369C4.68794 10.8369 3.44531 12.0796 3.44531 13.6066C3.44531 14.6702 4.04882 15.5942 4.93025 16.0578C4.60166 15.6023 4.40601 15.0454 4.40601 14.4424C4.40601 12.9153 5.64864 11.6727 7.17572 11.6727C7.46066 11.6727 7.73407 11.7199 7.99293 11.8006V8.43694C7.72504 8.40032 7.45314 8.37775 7.17572 8.37775C7.12756 8.37775 7.0804 8.38026 7.03274 8.38126V10.9643C6.77388 10.8836 6.50047 10.8364 6.21552 10.8364L6.21502 10.8369Z"
        fill="#FE2C55"
      />
      <path
        d="M16.8627 5.82428V8.38479C15.1545 8.38479 13.5713 7.83848 12.279 6.91089V13.6067C12.279 16.9508 9.55843 19.6708 6.21481 19.6708C4.92252 19.6708 3.72453 19.2635 2.73926 18.5717C3.84694 19.7611 5.42519 20.5066 7.17501 20.5066C10.5191 20.5066 13.2392 17.7861 13.2392 14.4424V7.74717C14.5315 8.67476 16.1147 9.22107 17.8229 9.22107V5.92612C17.4933 5.92612 17.1722 5.8905 16.8627 5.82428Z"
        fill="#FE2C55"
      />
      <path
        d="M12.2785 13.6066V6.91086C13.5708 7.83845 15.154 8.38476 16.8622 8.38476V5.82425C15.8754 5.61305 15.0061 5.08328 14.3659 4.34784C13.3335 3.6746 12.5885 2.59802 12.3562 1.34235H9.94422L9.93871 14.5462C9.88352 16.0247 8.66648 17.2116 7.17452 17.2116C6.25044 17.2116 5.43272 16.7551 4.92955 16.0573C4.04812 15.5932 3.44461 14.6692 3.44461 13.6061C3.44461 12.079 4.68724 10.8364 6.21432 10.8364C6.49927 10.8364 6.77268 10.8836 7.03154 10.9643V8.38125C3.75364 8.45801 1.11035 11.1459 1.11035 14.4419C1.11035 16.0362 1.72941 17.4875 2.73877 18.5711C3.72354 19.2624 4.92203 19.6703 6.21432 19.6703C9.55794 19.6703 12.2785 16.9497 12.2785 13.6061V13.6066Z"
        fill="black"
      />
    </svg>
  );
};
