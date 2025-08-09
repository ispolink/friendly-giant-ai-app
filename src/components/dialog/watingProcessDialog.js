import * as React from 'react'
import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'

import DialogBase from './dialogBase'

const WaitingProcessDialog = ({ open, onClose }) => {
  return (
    <DialogBase title="Payment in Progress" onClose={onClose} open={open}>
      <Content>
        <IconContainer>
          <Image src="/icon_process.png" alt="process" width={142} height={142} />
          <CircularProgress thickness={1.5} size={142} />
        </IconContainer>
        <strong>Awaiting payment confirmation</strong>
        <div>Please confirm the payment tansation in your wallet.</div>
      </Content>
    </DialogBase>
  )
}

export default WaitingProcessDialog

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
    background: #0000ff;
    opacity: 0.1;
    width: 142px;
    height: 142px;
    border-radius: 142px;
    position: absolute;
    left: 0;
    right: 0;
  }

  img {
    width: 142px;
    height: 142px;
  }

  .MuiCircularProgress-root {
    position: absolute;
    left: 0;
    right: 0;
    color: #0000ff;
  }
`
