import { Typography } from 'antd';

interface RegisterLabelProps {
  label: string;
  required?: boolean;
}

const RegisterLabel = (props: RegisterLabelProps) => {
  const { label, required = false } = props;
  return (
    <Typography style={{ fontWeight: 500, fontSize: 16 }}>
      {label} {required ? <span style={{ color: '#ba1717' }}>*</span> : ''}
    </Typography>
  );
};

export default RegisterLabel;
