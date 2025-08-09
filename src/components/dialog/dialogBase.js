import * as React from 'react'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const DialogBase = ({ children, title, open, onClose }) => {
  return (
    <BaseDialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={theme => ({
          position: 'absolute',
          right: 16,
          top: 14,
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </BaseDialog>
  )
}

export default DialogBase

const BaseDialog = styled(Dialog)`
  .MuiPaper-root {
    border: none;
    border-radius: 8px;
    width: 400px;
  }

  .MuiDialogTitle-root {
    margin: 20px 0 32px;
    padding: 0;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.25;
    text-align: center;
  }

  .MuiSvgIcon-root {
    width: 24px;
    height: 24px;
    color: ${props => props.theme.palette.text.primary};
  }

  .MuiDialogContent-root {
    padding-top: 0;
    font-size: 1.125rem;
  }
`
