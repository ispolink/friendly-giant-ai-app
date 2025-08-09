import * as React from 'react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Image from 'next/image'
import DialogBase from './dialogBase'

const SuccessDialog = ({ open, onClose, onOkay }) => {
  return (
    <DialogBase title="Payment in Progress" onClose={onClose} open={open}>
      <Content>
        <IconContainer>
          <Image src="/icon_check.png" alt="check" width={80} height={80} />
        </IconContainer>
        <strong>Payment completed</strong>
        <div>Your Transaction has been successfully processed.</div>
        <BlueButton onClick={onOkay}>Great! Thank you!</BlueButton>
      </Content>
    </DialogBase>
  )
}

export default SuccessDialog

const Content = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const IconContainer = styled.div`
  position: relative;
  width: 142px;
  height: 142px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: ' ';
    background: #3ddfb4;
    opacity: 0.1;
    width: 142px;
    height: 142px;
    border-radius: 142px;
    position: absolute;
    left: 0;
    right: 0;
  }

  img {
    width: 80px;
    height: 80px;
  }
`

const BlueButton = styled(ButtonBase)`
  margin-top: 24px;
  color: ${props => props.theme.palette.primary.contrastText};
  background: ${props => props.theme.palette.primary.main};
  padding: 12px 32px;
  border-radius: 100px;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.28;
  text-transform: none;
  &.Mui-disabled {
    filter: grayscale(1) brightness(0.9);
    opacity: 0.5;
    color: ${props => props.theme.palette.primary.contrastText};
  }
  .MuiCircularProgress-root {
    margin-right: 16px;
  }
`
