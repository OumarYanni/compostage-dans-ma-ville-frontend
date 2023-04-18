// Imports required
import { FC } from 'react' // Imports the FC (FunctionComponent) type from React

import { styled } from '@mui/system' // Import the 'styled' function from @mui/system

import {
  SnackbarProvider, // Imports the SnackbarProvider component from notistack
  SnackbarProviderProps, // Imports the SnackbarProviderProps type from notistack
  MaterialDesignContent // Imports the MaterialDesignContent component from notistack
} from 'notistack'

// MySnackbarProvider component
const MySnackbarProvider: FC<SnackbarProviderProps> = ({ children, ...props }) => {
  // Creation of the component StyledMaterialDesignContent with the colours of the custom theme
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.palette.success.main // Background colour for 'success' snackbars
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.palette.error.main // Background colour for 'error' snackbars
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: theme.palette.info.main // Background colour for 'info' snackbars
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: theme.palette.warning.main // Background colour for 'warning' snackbars
    }
  }))

  // Using the SnackbarProvider component
  return (
    <SnackbarProvider
      {...props} // Passes other props from the MySnackbarProvider component to the SnackbarProvider component
      Components={{
        success: StyledMaterialDesignContent, // Uses the StyledMaterialDesignContent component for 'success' snackbars
        error: StyledMaterialDesignContent, // Uses the StyledMaterialDesignContent component for 'error' snackbars
        info: StyledMaterialDesignContent, // Uses the StyledMaterialDesignContent component for 'info' snackbars
        warning: StyledMaterialDesignContent // Uses the StyledMaterialDesignContent component for 'warning' snackbars
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

// Exporting the MySnackbarProvider component
export default MySnackbarProvider
