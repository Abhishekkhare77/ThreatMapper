import '@testing-library/jest-dom';

import { forwardRef } from 'react';
import { HiHome } from 'react-icons/hi';
import { describe, expect, it } from 'vitest';

import { renderUI } from '../../tests/utils';
import { Breadcrumb, BreadcrumbLink } from './Breadcrumb';

export const Link = forwardRef<
  HTMLAnchorElement,
  {
    children: React.ReactNode;
    testid?: string;
    className?: string;
  }
>(({ children, className, testid }, forwardedRef) => {
  return (
    <a href="/test" className={className} ref={forwardedRef} data-testid={testid}>
      {children}
    </a>
  );
});

describe(`Component Breadcrumb`, () => {
  it(`render correct number of breadcrumbs with icons`, () => {
    const { getByText, getAllByText, getByTestId } = renderUI(
      <Breadcrumb separator={'||'}>
        <BreadcrumbLink asChild icon={<HiHome />}>
          <Link testid="linkOneTestId">Link One</Link>
        </BreadcrumbLink>
        <BreadcrumbLink asChild>
          <Link testid="linkTwoTestId">Link Two</Link>
        </BreadcrumbLink>
        <BreadcrumbLink asChild>
          <Link>Link Three</Link>
        </BreadcrumbLink>
      </Breadcrumb>,
    );
    const sep = getAllByText('||', {
      exact: false,
    });
    expect(sep.length).toBe(2);

    expect(
      getByText('Link One', {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      getByText('Link Two', {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      getByText('Link Three', {
        exact: true, // || seperator does not appear at the last link
      }),
    ).toBeInTheDocument();

    // first link should have icon prefix

    const firstLink = getByTestId('linkOneTestId');
    expect(firstLink).toBeInTheDocument();

    const firstSvgIcon = firstLink.querySelector('svg');
    expect(firstSvgIcon).not.toBe(null);

    // second link should not have icon prefix

    const secondLink = getByTestId('linkTwoTestId');
    expect(secondLink).toBeInTheDocument();

    const secondSvgIcon = secondLink.querySelector('svg');
    expect(secondSvgIcon).toBe(null);
  });
});
