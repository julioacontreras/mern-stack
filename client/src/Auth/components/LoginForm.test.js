import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Login from './LoginForm';
import authReducer from '../AuthReducer'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

test('renders Login find text Login', () => 
{
  const onLogin = () => {}
  const { getByText } = render(<Login onLogin={ onLogin } />, );
  const title = getByText(/Login/i);
  expect(title).toBeInTheDocument();
});
