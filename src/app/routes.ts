import type { RouteObject } from 'react-router';

import { Home, ImageCrop, ImageSpinning, ImageUploadAndCrop, NotFound } from '../components';
import App from './App';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'home', Component: Home },
      { path: 'image-spinning', Component: ImageSpinning },
      { path: 'image-crop', Component: ImageCrop },
      { path: 'upload-and-crop', Component: ImageUploadAndCrop },
      { path: '*', Component: NotFound },
    ],
  },
];
