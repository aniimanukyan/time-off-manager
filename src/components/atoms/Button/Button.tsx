import { IonButton, IonFabButton, IonIcon } from '@ionic/react';
import { add, chevronBack } from 'ionicons/icons';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  icon?: keyof typeof ICONS;
  iconOnly?: boolean;
  full?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const ICONS = { plus: add, back: chevronBack };

const VARIANT_PROPS: Record<ButtonVariant, { color?: string; fill: 'solid' | 'outline' | 'clear' }> = {
  primary: { color: 'primary', fill: 'solid' },
  ghost: { color: 'primary', fill: 'clear' },
  secondary: { fill: 'solid' },
  danger: { fill: 'outline' },
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  icon,
  iconOnly,
  full,
  disabled,
  type,
  onClick,
}) => {
  const { color, fill } = VARIANT_PROPS[variant];
  const classes = `${iconOnly ? styles.iconOnly : styles.button} ${styles[variant] ?? ''}`;
  const iconEl = icon && <IonIcon aria-hidden="true" icon={ICONS[icon]} slot={iconOnly ? undefined : 'start'} />;

  if (iconOnly) {
    return (
      <IonFabButton className={classes} color={color} aria-label={label} disabled={disabled} onClick={onClick}>
        {iconEl}
      </IonFabButton>
    );
  }

  return (
    <IonButton
      className={classes}
      type={type}
      color={color}
      fill={fill}
      expand={full ? 'block' : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {iconEl}
      {label}
    </IonButton>
  );
};

export default Button;
