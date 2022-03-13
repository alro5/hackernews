import "./skeleton-loader.scss";

export interface SkeletonLoaderProps {
  height?: number;
  width?: number;
}

export function SkeletonLoader(props: SkeletonLoaderProps): JSX.Element {
  const { height, width } = props;

  return <span style={{ height, width }} className="skeleton-loader"></span>;
}
