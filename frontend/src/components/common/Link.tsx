import React, {
  AnchorHTMLAttributes,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  Ref
} from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

// NextComposed component prop types
type NextComposedProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

// Ref-forwarded Next Link component
const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
  (
    {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...rest
    }: PropsWithChildren<NextComposedProps>,
    ref
  ): ReactElement => {
    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...rest} />
      </NextLink>
    );
  }
);

// Link component prop types
type LinkProps = {
  innerRef?: Ref<HTMLAnchorElement>;
} & NextComposedProps &
  Omit<MuiLinkProps, 'ref'>;

/**
 * Material-UI Link with ref forwarded to Next Link
 */
const Link: FC<LinkProps> = ({ className, innerRef, ...rest }: LinkProps) => {
  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...rest}
    />
  );
};

export default forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
