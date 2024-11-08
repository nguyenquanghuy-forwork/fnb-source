import { Props } from './LinkBranchIcon';

const LinkedBranchIcon = (props: Props) => {
  const { width = 16, height = 16, color = '#50429B' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        d="M11.7468 8.42884L14.2357 5.93994C14.7783 5.3943 15.0829 4.65609 15.0829 3.88659C15.0829 3.1171 14.7783 2.37889 14.2357 1.83325V1.79177C13.9659 1.51481 13.6434 1.29469 13.2872 1.14439C12.931 0.994091 12.5482 0.916656 12.1616 0.916656C11.775 0.916656 11.3923 0.994091 11.036 1.14439C10.6798 1.29469 10.3573 1.51481 10.0875 1.79177L7.59863 4.28067"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.42893 11.7474L5.94003 14.2363C5.3944 14.7789 4.65618 15.0834 3.88669 15.0834C3.11719 15.0834 2.37898 14.7789 1.83334 14.2363H1.79186C1.5149 13.9665 1.29478 13.644 1.14448 13.2878C0.994182 12.9315 0.916748 12.5488 0.916748 12.1622C0.916748 11.7756 0.994182 11.3928 1.14448 11.0366C1.29478 10.6804 1.5149 10.3579 1.79186 10.0881L4.28076 7.59921"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.86572 3.86584L12.1621 12.1622"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkedBranchIcon;
