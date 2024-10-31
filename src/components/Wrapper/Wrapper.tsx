import styles from './Wrapper.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};
