import styles from './InfoBanner.module.scss';

type InfoBannerTone = 'ok' | 'info' | 'warn' | 'err' | 'success';

type InfoBannerProps = {
  title: string;
  text?: string;
  tone?: InfoBannerTone;
};

const TONE_COLOR: Record<InfoBannerTone, string> = {
  ok: 'notice',
  info: 'cancelled',
  warn: 'pending',
  err: 'rejected',
  success: 'approved',
};

const InfoBanner: React.FC<InfoBannerProps> = ({ title, text, tone = 'ok' }) => (
  <div role="status" className={`${styles.banner} ion-color-${TONE_COLOR[tone]}`}>
    <span className={styles.title}>{title}</span>
    {text && <span className={styles.text}>{text}</span>}
  </div>
);

export default InfoBanner;
