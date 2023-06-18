import React from 'react'

import { ThemeProvider } from '@mui/material/styles'

import { render, fireEvent } from '@testing-library/react'
import { useSnackbar } from 'notistack'

import MySnackbarProvider from './SnackbarProvider'
import { customTheme as theme } from '../styles/theme'

const TestComponent = ({ variant, children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const showMessage = () => {
    enqueueSnackbar(children, { variant })
  }

  return <button onClick={showMessage}>Show {variant}</button>
}

const defaultTheme = theme

function renderWithTheme(ui, { theme = defaultTheme, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

test('Test des couleurs et des messages des snackbars', async () => {
  const testMessages = {
    success: 'Success Message',
    error: 'Error Message',
    info: 'Info Message',
    warning: 'Warning Message'
  }

  const { getByText, findByRole } = renderWithTheme(
    <MySnackbarProvider maxSnack={3}>
      {Object.entries(testMessages).map(([variant, message]) => (
        <TestComponent key={variant} variant={variant}>
          {message}
        </TestComponent>
      ))}
    </MySnackbarProvider>
  )

  for (const [variant, message] of Object.entries(testMessages)) {
    fireEvent.click(getByText(`Show ${variant}`))
    let snackbar = await findByRole('alert')
    expect(snackbar).toHaveStyle(`background-color: ${theme.palette[variant].main}`)
    expect(snackbar).toHaveTextContent(message)
  }
})
