import styles from './Skeleton.module.scss';

interface SkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}

function Skeleton({
  height = '1.25rem',
  width = '100%',
  borderRadius = '0.25rem',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        height,
        width,
        borderRadius,
      }}
    />
  );
}

export default Skeleton;
