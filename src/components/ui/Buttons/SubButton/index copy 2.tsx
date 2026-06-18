import { subButtonStyles } from './subButtonStyles';
import { SubButtonProps } from './type';

export const SubButton = ({
  className,
  variant = 'white',
  iconSize = 'sm',
  leftIcon: Icon,
  children,
  isSubmit: isSubmitProp,
  type = 'button',
  ...rest
}: SubButtonProps) => {
  const iconColor = 'white';
  const isSubmit = isSubmitProp || type === 'submit';
  const styles = subButtonStyles({ variant, isSubmit, className });

  return (
    <button className={styles} type={type} {...rest}>
      {Icon && <Icon size={iconSize} color={iconColor} className='shrink-0' />}
      {children}
    </button>
  );
};
