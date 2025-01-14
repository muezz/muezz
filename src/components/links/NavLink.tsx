import * as React from 'react';

import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/links/UnderlineLink';
import { UnstyledLinkProps } from '@/components/links/UnstyledLink';

type NavLinkProps<C extends React.ElementType> = {
  as?: C;
  direction?: 'left' | 'right';
} & UnstyledLinkProps &
  React.ComponentProps<C>;

export default function NavLink<C extends React.ElementType>({
  children,
  className,
  direction = 'right',
  as,
  ...rest
}: NavLinkProps<C>) {
  const Component = as || UnderlineLink;

  return (
    <Component
      {...rest}
      className={cn(
        'group gap-[0.25em]',
        direction === 'left' && 'flex-row-reverse',
        className
      )}
    >
      <span>{children}</span>
    </Component>
  );
}
