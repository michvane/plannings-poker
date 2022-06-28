import clsx from 'clsx';
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react';
import Color from 'types/Color';
import style from './typography.module.scss';

type TypographyProps = {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'a'
    | 'time'
    | 'label';
  children: ReactNode;
  color?: Color;
  className?: string;
  italic?: boolean;
  weight?: string;
  variant?:
    | 'hero'
    | 'xxl'
    | 'xl'
    | 'lg'
    | 'md'
    | 'sm'
    | 'xs'
    | 'textXL'
    | 'textLG'
    | 'textMD'
    | 'textSM'
    | 'textXS';
} & ComponentProps<'h1'> &
  ComponentProps<'h2'> &
  ComponentProps<'h3'> &
  ComponentProps<'h4'> &
  ComponentProps<'h5'> &
  ComponentProps<'h6'> &
  ComponentProps<'p'> &
  ComponentProps<'span'> &
  ComponentProps<'a'> &
  ComponentProps<'time'> &
  ComponentProps<'label'>;

const variantClasses: { [key: string]: string[] } = {
  hero: [style.hero],
  xxl: [style.xxl],
  xl: [style.xl],
  lg: [style.lg],
  md: [style.md],
  sm: [style.sm],
  xs: [style.xs],
  textXL: [style.textXL],
  textLG: [style.textLG],
  textMD: [style.textMD],
  textSM: [style.textSM],
  textXS: [style.textXS],
};

const Typography: FunctionComponent<TypographyProps> = ({
  as: Component = 'span',
  color,
  children,
  className = '',
  italic = false,
  variant = 'sm',
  weight,
  ...otherProps
}) => (
  <Component
    className={clsx(
      ...variantClasses[variant].filter(
        // if color is passed then remove own color class
        (cls) => !color || (color && !/^text-(black|darkGrey)$/.test(cls)),
      ),
      color && `text-${color}`,
      italic && 'italic',
      weight && style[`${weight}Font`],
      Component === 'p' && 'mb-6',
      className,
    )}
    {...otherProps}
  >
    {children}
  </Component>
);

export default Typography;
