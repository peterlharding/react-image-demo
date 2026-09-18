export interface NavItem {
  to: string;
  /** Label in the top navigation bar. */
  label: string;
  /** Shorter label in the footer. */
  footerLabel: string;
}

export const navItems: readonly NavItem[] = [
  { to: '/', label: 'Home', footerLabel: 'Home' },
  { to: '/image-spinning', label: 'Spinning Image', footerLabel: 'Spinning' },
  { to: '/image-crop', label: 'Simple Crop Demo', footerLabel: 'Cropping' },
  { to: '/upload-and-crop', label: 'Upload Image and Crop', footerLabel: 'Upload and Crop' },
];
