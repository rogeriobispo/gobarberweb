import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/Signin';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn page', () => {
  it('should be able to sign in', () => {
    const page = render(<SignIn />);

    page.debug();
  });
});
