import clsx from 'clsx';
import React, { FunctionComponent, ReactNode } from 'react';
import style from './container.module.scss';

type ContainerProps = {
  as?: 'div' | 'section' | 'article' | 'main' | 'p' | 'nav';
  size?: 'tight' | 'wide';
  className?: string;
  children: ReactNode;
};

const Container: FunctionComponent<ContainerProps> = ({
  as: Component = 'div',
  children,
  className = '',
  size,
  ...otherProps
}) => {
  return (
    <Component
      className={clsx(style.container, size && style[size], className)}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
export default Container;
