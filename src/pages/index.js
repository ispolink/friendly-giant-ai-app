// pages/index.js
import { useEffect, useState} from 'react';
import { Button, IconButton, InputBase, Paper } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase';
import styled from '@emotion/styled';
import { Tweet } from 'react-tweet'
import { appKitModal } from '@/config';
import { breakpointsUp } from '@/utils/responsive';
import { useAppKitAccount } from '@reown/appkit/react';
import { getTweetId } from '@/utils/getTweetId';

export default function Home() {
  const [command, setCommand] = useState()
  const [url, setUrl] = useState('')
  const [tweetId, setTweetId] = useState()

  const commands = [
    {id: 'like', name: 'Like'},
    {id: 'reply', name: 'Reply'},
    {id: 'reply-thread', name: 'Reply To Thread'},
    {id: 'analysis', name: 'Token Analysis'},
    {id: 'retweet', name: 'Retweet'},
    {id: 'retweet-comment', name: 'Retweet & Comment'},
  ]

  const accountState = useAppKitAccount()

  return accountState.isConnected ? (
    <HomeContainer>
      <div>
        <HomeTitle>Friendly Giant AI Agent</HomeTitle>
        <MenuGrid>
          {commands.map(c => (
            <ButtonBase
              key={c.id}
              className={`${c.id} ${command && command != c.id ? 'gray' : ''}`}
              onClick={() => setCommand(c.id)}
            >
              {c.name}
            </ButtonBase>
          ))}
        </MenuGrid>
        {command && (
          <>
            <PaperBox className={(url && !getTweetId(url)) ? 'error' : ''} sx={{ p: 1, display: 'flex', alignItems: 'center'}}>
              <InputBase
                sx={{ mr: 1, flex: 1 }}
                placeholder="Put your x.com url heres"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    setTweetId(getTweetId(url))
                  }
                }}
              />
              <SendButton onClick={() => setTweetId(getTweetId(url))}>
                <img src="./icon_send.svg" alt="send"/>
              </SendButton>
            </PaperBox>
            {(url && !getTweetId(url)) && (
              <Error>
                Please a valid tweet url
              </Error>
            )}
            <BlueButton sx={{ width: '100%' }}>Publish</BlueButton>
          </>
        )}
      </div>
      <TweetBox>
        {command ? (
          <EmptyTweetBox>
            {tweetId && <Tweet id={tweetId} />}
          </EmptyTweetBox>
        ) : (
          <EmptyTweetBox>
            <EmptyCircle />
            Please select one of the options
          </EmptyTweetBox>
        )}
      </TweetBox>
    </HomeContainer>
  ) : (
    <WelcomeContainer>
      <WelcomeSubContainer>
        <WelcomeTitle>
          Welcome to the Friendly Giant AI Agent
        </WelcomeTitle>
        <img src='./icon_wallet_not_connected.png' alt='Wallet not connected'/>
        <SubTitle>Your wallet isn't connected yet</SubTitle>
        <Text>To use our services you need to connect your wallet. Please click on the button below to connect it.</Text>
        <RedButton onClick={() => appKitModal.open()}>Connect Wallet</RedButton>
      </WelcomeSubContainer>
    </WelcomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  ${breakpointsUp('flex-direction', [{ 0: 'column' }, { 1024: 'column' }, { 1536: 'row' }])};
  justify-content: space-between;
  align-items: stretch;
  background: ${props => props.theme.palette.background.paper};
  ${breakpointsUp('padding', [{ 0: '32px 24px 24px' }, { 1024: '32px' }, { 1536: '32px;' }])};
  ${breakpointsUp('margin', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px 140px 32px;' }])};
  ${breakpointsUp('border-radius', [{ 0: '16px' }, { 1024: '24px' }, { 1536: '24px;' }])};
`

const HomeTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.1;
  font-weight: 600;
  margin-bottom: 32px;
  ${breakpointsUp('font-size', [{ 0: '2rem' }, { 1024: '2.625rem' }, { 1536: '2.625rem;' }])};
`

const MenuGrid = styled.div`
  display: grid;
  ${breakpointsUp('grid-template-columns', [
    { 0: 'minmax(159px, 1fr) minmax(159px, 1fr)' },
    { 1024: 'minmax(283px, 1fr) minmax(283px, 1fr) minmax(283px, 1fr)' },
    { 1536: 'minmax(289px, 1fr) minmax(289px, 1fr)'}
  ])};
  ${breakpointsUp('grid-template-rows', [
    { 0: ' 104px 104px 104px' },
    { 1024: ' 187px 187px' },
    { 1536: ' 187px 187px 187px'}
  ])};
  ${breakpointsUp('margin-bottom', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '25px' }])};
  ${breakpointsUp('grid-gap', [{ 0: '16px' }, { 1024: '24px' }])};
  > * {
    border-radius: 16px !important;
    border: 1px solid ${props => props.theme.palette.colors.formControl.border} !important;
    cursor: pointer !important;
    user-select: none !important;
    font-weight: 600 !important;
    background-position: right bottom !important;
    background-repeat: no-repeat !important;
    background-size: auto 84% !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    transition: all .15s cubic-bezier(.5,1,.25,1);

    ${breakpointsUp('font-size', [{ 0: '1rem  !important' }, { 1024: '1.5rem  !important' }])};
    ${breakpointsUp('padding', [{ 0: '12px 16px  !important' }, { 1024: '20px 24px  !important' }])};

    &:hover {
      border: 2px solid ${props => props.theme.palette.colors.formControl.hover.border} !important;
    }

    &.like { background-image: url('./icon-1_like.png'); }
    &.reply { background-image: url('./icon-2_reply.png'); }
    &.reply-thread { background-image: url('./icon-3_reply-to-thread.png'); }
    &.analysis { background-image: url('./icon-4_token-analysis.png'); }
    &.retweet { background-image: url('./icon-5_retweet.png'); }
    &.retweet-comment { background-image: url('./icon-6_retweet_and_comment.png'); }

    &.gray {
      filter: grayscale(1) brightness(0.9);
      opacity: 0.5;
    }
  }
`

const WelcomeContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background: ${props => props.theme.palette.background.paper};
  ${breakpointsUp('padding', [{ 0: '32px' }, { 1024: '64px' }, { 1536: '64px;' }])};
  ${breakpointsUp('margin', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px 140px 32px;' }])};
  ${breakpointsUp('border-radius', [{ 0: '16px' }, { 1024: '24px' }, { 1536: '24px;' }])};
`

const WelcomeSubContainer = styled.div`
  max-width: 840px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 136px;
    height: 136px;
    margin-bottom: 16px;
  }
`

const WelcomeTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.1;
  font-weight: 600;
  ${breakpointsUp('font-size', [{ 0: '2rem' }, { 1024: '5rem' }, { 1536: '5rem;' }])};
  ${breakpointsUp('margin-bottom', [{ 0: '32px' }, { 1024: '55px' }, { 1536: '55px' }])};
`

const SubTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 12px;
`

const Text = styled.div`
  width: 256px;
  text-align: center;
  line-height: 1.43;
  font-weight: normal;
  font-size: 0.875rem;
  margin-bottom: 24px;
`

const Error = styled.div`
  color: ${props => props.theme.palette.warning.main};
  line-height: 1.43;
  font-weight: normal;
  font-size: 0.875rem;
  ${breakpointsUp('margin-top', [{ 0: '-8px' }, { 1024: '-24px' }, { 1536: '-24px' }])};
  ${breakpointsUp('margin-bottom', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px' }])};
`

const RedButton = styled(Button)`
  color: ${props => props.theme.palette.warning.contrastText};
  background: ${props => props.theme.palette.warning.main};
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 1.125rem;
  text-transform: none;
`

const BlueButton = styled(Button)`
  color: ${props => props.theme.palette.primary.contrastText};
  background: ${props => props.theme.palette.primary.main};
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 1.125rem;
  text-transform: none;
`

const SendButton = styled(BlueButton)`
  min-width: 50px;  
  width: 50px;
  height: 50px;
  border-radius: 8px;
  padding: 0;
  img {
    width: 24px;
    height: 24px;
    filter: invert(1)
  }
`

const PaperBox = styled(Paper)`
  border: 1px solid ${props => props.theme.palette.colors.formControl.border} !important;
  box-shadow: none;
  height: 82px;
  ${breakpointsUp('margin-bottom', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px' }])};

  &:focus,
  &:focus-visible,
  &:focus-within  {
    border: 2px solid ${props => props.theme.palette.colors.formControl.focused.border} !important;
  }

  &.error  {
    border-color: ${props => props.theme.palette.warning.main} !important;
  }
`

const TweetBox = styled.div`
  min-height: 354px;
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  background: ${props => props.theme.palette.colors.tweetbox.background};
  ${breakpointsUp('border-radius', [{ 0: '8px' }, { 1024: '24px' }, { 1536: '24px' }])};
  ${breakpointsUp('margin-top', [{ 0: '24px' }, { 1024: '32px' }, { 1536: '0' }])};
  ${breakpointsUp('margin-left', [{ 0: '0' }, { 1024: '0' }, { 1536: '32px' }])};
`

const EmptyTweetBox = styled.div`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const EmptyCircle = styled.div`
  margin-bottom: 24px;
  ${breakpointsUp('width', [{ 0: '190px' }, { 1024: '192px' }])};
  ${breakpointsUp('height', [{ 0: '190px' }, { 1024: '192px' }])};
  border-radius: 192px;
  background-color: ${props => props.theme.palette.colors.formControl.autofill.background};
`