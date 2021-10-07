import { ReactChild } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: ReactChild;
}
export default function Button({ children }: ButtonProps) {
  return (
    <button type="button" className={styles.previewButton}>
      {children}
    </button>
  );
}
