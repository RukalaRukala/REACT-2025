import styles from './Skeleton.module.scss';

interface SkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({
  height = '1.25rem',
  width = '100%',
  borderRadius = '0.25rem',
  className = '',
}: SkeletonProps) => {
  const skeletonStyle = {
    height,
    width,
    borderRadius,
  };

  return (
    <div className={`${styles.skeleton} ${className}`} style={skeletonStyle} />
  );
};

export default Skeleton;
