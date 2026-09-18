import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { routes } from './routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

describe('routes', () => {
  it.each([
    ['/', 'Simple Image Display'],
    ['/home', 'Simple Image Display'],
    ['/image-spinning', 'Image Spinning'],
    ['/image-crop', 'Image Crop'],
    ['/upload-and-crop', 'Upload and Crop an Image'],
    ['/missing', 'Page not found'],
  ])('%s renders "%s"', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  });

  it('marks only the current page active in the nav bar', () => {
    renderAt('/image-crop');
    const nav = screen.getByRole('navigation');
    const links = Array.from(nav.querySelectorAll('.nav-link'));
    expect(links.filter((l) => l.classList.contains('active')).map((l) => l.textContent)).toEqual([
      'Simple Crop Demo',
    ]);
  });

  it('navigates from the footer', async () => {
    const router = renderAt('/');
    const footer = screen.getByRole('contentinfo');
    const link = Array.from(footer.querySelectorAll('a')).find((a) => a.textContent === 'Upload and Crop');
    expect(link).toBeDefined();
    if (link) await userEvent.click(link);
    expect(router.state.location.pathname).toBe('/upload-and-crop');
  });
});

describe('upload page', () => {
  it('prompts for a file and shows no crop controls until one is chosen', () => {
    renderAt('/upload-and-crop');
    expect(screen.getByLabelText('Image file')).toHaveAttribute('accept', 'image/*');
    expect(screen.getByText('Choose an image to start cropping.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Download cropped image' })).not.toBeInTheDocument();
  });
});
