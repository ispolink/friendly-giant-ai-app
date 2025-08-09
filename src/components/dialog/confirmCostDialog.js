import * as React from 'react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import DialogBase from './dialogBase'
import Image from 'next/image'

const ConfirmCostDialog = ({ cost = '0', open, onOkay, onCancel }) => {
  return (
    <DialogBase title="Publish Costs" onClose={onCancel} open={open}>
      <Content>
        <IconContainer>
          <Image src="/icon_questionmark.png" alt="questionmark" width={142} height={142} />
        </IconContainer>
        <div>
          Publishing this costs {cost}.<br />
          Do you want to continue?
        </div>
        <div>
          <GreenButton onClick={onOkay}>Continue</GreenButton>
          <RedBorderButton onClick={onCancel}>Close</RedBorderButton>
        </div>
      </Content>
    </DialogBase>
  )
}

export default ConfirmCostDialog

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
`

const GreenButton = styled(ButtonBase)`
  margin-top: 24px;
  color: ${props => props.theme.palette.primary.contrastText};
  background: ${props => props.theme.palette.secondary.main};
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

const RedBorderButton = styled(ButtonBase)`
  margin-left: 8px;
  margin-top: 24px;
  color: ${props => props.theme.palette.warning.main};
  border: 2px solid ${props => props.theme.palette.warning.main};
  background: transparent;
  padding: 12px 32px;
  border-radius: 100px;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.28;
  text-transform: none;
  &.Mui-disabled {
    filter: grayscale(1) brightness(0.9);
    opacity: 0.5;
    color: ${props => props.theme.palette.warning.main};
  }
  .MuiCircularProgress-root {
    margin-right: 16px;
  }
`
