// pages/index.js
import { useEffect, useState } from 'react'
import { Button, InputBase, Paper, CircularProgress, Link } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import styled from '@emotion/styled'
import { Tweet } from 'react-tweet'
import { appKitModal } from '@/config'
import { breakpointsUp } from '@/utils/responsive'
import { useAppKitAccount } from '@reown/appkit/react'
import { getTweetId } from '@/utils/getTweetId'
import {
  useTokenBalance,
  useActionPrices,
  useAnalyzeToken,
  useInteractWithPost,
} from '@/components/web3'
import { XActionType } from '@/constants'
import { getBlockExplorerUrl, getXRequestContractAddress } from '@/config/chain'
import { useChainId } from 'wagmi'
import FollowButton from '@/components/following-button'
import { useAllowance } from '@/components/web3/useAllowance'
import { useApprove } from '@/components/web3/useApprove'
import { useSymbol } from '@/components/web3/useSymbol'
import { formatTokenAmount } from '@/utils/currencies'

const NoCommandDetail = 'NoCommandDetail'
const NoTweetDetail = 'NoTweetDetail'
const TweetDetail = 'TweetDetail'
const SuccessDetail = 'SuccessDetail'
const FailTransactionDetail = 'FailTransactionDetail'
const FailApproveDetail = 'FailAllowanceDetail'

const Commands = [
  { id: 'like', name: 'Like', aType: XActionType.Like },
  { id: 'reply', name: 'Reply', aType: XActionType.Reply },
  { id: 'repost', name: 'Repost', aType: XActionType.Repost },
  { id: 'repost-comment', name: 'Repost & Comment', aType: XActionType.RepostWithComment },
  { id: 'reply-thread', name: 'Reply To Thread', aType: XActionType.ReplyToThread },
  { id: 'analysis', name: 'Token Analysis', aType: XActionType.TokenAnalysis },
]

export default function Home() {
  const [command, setCommand] = useState()
  const [url, setUrl] = useState('')
  const [tweetId, setTweetId] = useState()
  const [isInsfficientFunds, setInsfficientFunds] = useState(false)
  const [isBusy, setBusy] = useState(false)
  const [detailView, setDetailView] = useState(NoCommandDetail)
  const [lastTx, setLastTx] = useState()
  const [tokenSymbol, setTokenSymbol] = useState('GGAI')
  const [actionAllowance, setActionAllowance] = useState(0)

  const chainId = useChainId()
  const accountState = useAppKitAccount()
  const requestProcessorAddress = getXRequestContractAddress(chainId)

  const { refetch: refetchBalance, ...balanceStatus } = useTokenBalance()

  const { refetch: refetchPrices, ...priceStatus } = useActionPrices()

  const { refetch: refetchSymbol } = useSymbol()

  const {
    analyze,
    isSuccess: isAnalSuccess,
    isError: isAnalError,
    ...analyzeStatus
  } = useAnalyzeToken()

  const {
    interact,
    isSuccess: isActSuccess,
    isError: isActError,
    ...interactStatus
  } = useInteractWithPost()

  const { refetch: refetchAllowance } = useAllowance()

  const { approve, isError: isApproveError, ...approveStatus } = useApprove()

  const comingSoonCommands = ['reply-thread', 'analysis']

  const publish = async () => {
    if (!command) return

    setBusy(true)
    const [balanceResult, priceResult, allowanceResult] = await Promise.all([
      refetchBalance(),
      refetchPrices(),
      refetchAllowance(requestProcessorAddress),
    ])
    if (balanceResult.isError || priceResult.isError || allowanceResult.isError) {
      console.error('error on fetching price')
      setBusy(false)
      return
    }
    const balance = balanceResult.data
    const amount = priceResult.data[command.aType]
    const allowance = allowanceResult.data

    setActionAllowance(amount)

    if (balance < amount) {
      setInsfficientFunds(true)
      setBusy(false)
      return
    }

    if (allowance < amount) {
      try {
        await approve(requestProcessorAddress, amount)
      } catch {
        return setBusy(false)
      }
    }

    try {
      if (command.aType == XActionType.TokenAnalysis) {
        await analyze(url)
      } else {
        await interact(command.aType, url)
      }
    } catch (err) {
      console.error(err)
    }
    setBusy(false)
  }

  const getHash = () => {
    if (!command) return
    if (command.aType == XActionType.TokenAnalysis) {
      return analyzeStatus.hash
    } else {
      return interactStatus.hash
    }
  }

  const isPending = () => {
    if (!command) return false
    if (command.aType == XActionType.TokenAnalysis) {
      return analyzeStatus.isPending
    } else {
      return interactStatus.isPending
    }
  }

  const setTweetPreview = url => {
    setDetailView(TweetDetail)
    setTweetId(getTweetId(url))
  }

  useEffect(() => {
    const fetch = async () => {
      const symbolResult = await refetchSymbol()
      if (symbolResult.status != 'success') {
        setTimeout(fetch, 1000)
      } else {
        setTokenSymbol(symbolResult.data)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (isAnalSuccess || isActSuccess) {
      setLastTx(analyzeStatus.hash || interactStatus.hash)
      setDetailView(SuccessDetail)
      analyzeStatus.reset()
      interactStatus.reset()
    }
  }, [isAnalSuccess, isActSuccess])

  useEffect(() => {
    if (isAnalError || isActError) {
      setLastTx(analyzeStatus.hash || interactStatus.hash || lastTx)
      setDetailView(FailTransactionDetail)
      analyzeStatus.hash && analyzeStatus.reset()
      interactStatus.hash && interactStatus.reset()
    }
  }, [isAnalError, isActError])

  useEffect(() => {
    if (isApproveError) {
      setDetailView(FailApproveDetail)
    }
  }, [isApproveError])

  return accountState.isConnected ? (
    <HomeContainer>
      <div>
        <HomeTitle>
          <div>Friendly Giant AI Agent</div>
          <p>Your trusted AI KOL & Companion</p>
        </HomeTitle>
        <MenuGrid>
          {Commands.map(c => (
            <div key={c.id} className="button-container">
              <ButtonBase
                className={`${c.id} ${command && command.id != c.id ? 'gray' : ''}`}
                disabled={comingSoonCommands.includes(c.id)}
                onClick={async () => {
                  setInsfficientFunds(false)
                  analyzeStatus.reset()
                  interactStatus.reset()
                  setCommand(c)
                  setDetailView(NoTweetDetail)
                }}
              >
                {c.name}
              </ButtonBase>
              {comingSoonCommands.includes(c.id) && (
                <img alt={`coming_soon_${c.id}`} src="./icon_coming_soon_dark.svg" />
              )}
            </div>
          ))}
        </MenuGrid>
        <PaperBox
          className={url && !getTweetId(url) ? 'error' : ''}
          sx={{ p: 1, display: 'flex', alignItems: 'center' }}
        >
          <InputBase
            sx={{ mr: 1, flex: 1 }}
            disabled={!command}
            placeholder="https://x.com/elonmusk/status/1941615863423172853"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setTweetPreview(url)
              }
            }}
          />
          <SendButton
            disabled={!url || (url && !getTweetId(url))}
            onClick={() => setTweetPreview(url)}
          >
            <img src="./icon_send.svg" alt="send" />
          </SendButton>
        </PaperBox>
        {url && !getTweetId(url) && <Error>Please a valid X Post link</Error>}
        <BlueButton
          sx={{ width: '100%' }}
          disabled={
            (!tweetId && (!url || (url && !getTweetId(url)))) ||
            balanceStatus.isLoading ||
            priceStatus.isLoading ||
            isPending() ||
            isInsfficientFunds ||
            isBusy
          }
          onClick={() => {
            if (tweetId) {
              publish()
            } else {
              setTweetPreview(url)
            }
          }}
        >
          {(isPending() || isBusy) && <CircularProgress size={20} color="inherit" />}
          {!tweetId ? 'Preview' : isInsfficientFunds ? 'Insufficient funds' : 'Publish'}
        </BlueButton>
        {getHash() && (
          <HashText>
            View TX:
            {isPending() && <CircularProgress size={14} color="inherit" />}
            <TxLink href={getBlockExplorerUrl(chainId, getHash())} underline="none" target="_blank">
              {getHash()}
            </TxLink>
          </HashText>
        )}
      </div>
      <DetailContainer>
        {detailView == NoCommandDetail ? (
          <DetailBox key="no-command">
            <img src="./icon_please-select-one-of-the-options.png" alt="send" />
            <h1>Please select One of the Options</h1>
          </DetailBox>
        ) : detailView == NoTweetDetail ? (
          <DetailBox key="no-tweet">
            <img src="./icon_enter-link-to-x-post.png" alt="send" />
            <h1>Enter Link to X Post</h1>
            <div>
              Enter a link to an X Post you want the Giant AI to interact with and click "Preview"
            </div>
          </DetailBox>
        ) : detailView == TweetDetail ? (
          <TweetBox key="tweet">{tweetId && <Tweet id={tweetId} />}</TweetBox>
        ) : detailView == SuccessDetail ? (
          <SuccessBox key="success">
            <img src="./icon_check.png" />
            <h1>We’re processing your request</h1>
            <div>
              Your request has been recorded on the blockchain! It will appear on @friendly_giant_ai
              X profile in 30 min.
            </div>
            {lastTx && (
              <TxLink target="_blank" href={getBlockExplorerUrl(chainId, lastTx)}>
                View Transaction ID: {lastTx || 'None'}
              </TxLink>
            )}
            <BlueButton
              onClick={() => {
                setCommand()
                setLastTx()
                setDetailView(NoCommandDetail)
              }}
            >
              New Interaction
            </BlueButton>
            <FollowButton username="ispolink" dataId="home-follow" caption="Friendly Giant AI" />
          </SuccessBox>
        ) : detailView == FailApproveDetail ? (
          <ErrorBox key="error">
            <img src="./img_wallet_warning.png" />
            <h1>Approval for {tokenSymbol} failed</h1>
            <div>
              {`Oh no, the approval TX for ${tokenSymbol} has failed. You need to approve
                ${formatTokenAmount(actionAllowance)} ${tokenSymbol} tokens in order to get your request processed.`}
            </div>
            <BlueButton
              disabled={
                balanceStatus.isLoading ||
                priceStatus.isLoading ||
                isPending() ||
                isInsfficientFunds ||
                isBusy
              }
              onClick={() => publish()}
            >
              {(isPending() || isBusy) && <CircularProgress size={20} color="inherit" />}
              Retry
            </BlueButton>
          </ErrorBox>
        ) : (
          <ErrorBox key="error">
            <img src="./icon_x.png" />
            <h1>Request failed</h1>
            <div>
              Oh no! There was an error publishing your request on the blockchain. Try to adjust the
              gas price/limit and try again.
            </div>
            {lastTx && (
              <TxLink target="_blank" href={getBlockExplorerUrl(chainId, lastTx)}>
                <div>View Transaction ID: </div>
                <div>{lastTx || 'None'}</div>
              </TxLink>
            )}
            <BlueButton
              disabled={
                balanceStatus.isLoading ||
                priceStatus.isLoading ||
                isPending() ||
                isInsfficientFunds ||
                isBusy
              }
              onClick={() => publish()}
            >
              {(isPending() || isBusy) && <CircularProgress size={20} color="inherit" />}
              Retry
            </BlueButton>
          </ErrorBox>
        )}
      </DetailContainer>
    </HomeContainer>
  ) : (
    <WelcomeContainer>
      <WelcomeSubContainer>
        <WelcomeTitle>Welcome to the Friendly Giant AI Agent</WelcomeTitle>
        <img src="./icon_wallet_not_connected.png" alt="Wallet not connected" />
        <SubTitleContainer>
          <SubTitle>Your wallet isn't connected yet</SubTitle>
          <Text>
            To use our services you need to connect your wallet. Please click on the button below to
            connect it.
          </Text>
          <RedButton onClick={() => appKitModal.open()}>Connect Wallet</RedButton>
        </SubTitleContainer>
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
  min-height: calc(100vh - 128px);
  ${breakpointsUp('padding', [{ 0: '32px 24px 24px' }, { 1024: '32px' }, { 1536: '32px;' }])};
  ${breakpointsUp('margin', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px 140px 32px;' }])};
  ${breakpointsUp('border-radius', [{ 0: '16px' }, { 1024: '36px' }, { 1536: '36px;' }])};
`

const HomeTitle = styled.div`
  width: 100%;
  text-align: left;
  line-height: 1.1;
  font-weight: 600;
  margin-bottom: 32px;
  ${breakpointsUp('font-size', [{ 0: '2rem' }, { 1024: '2.625rem' }, { 1536: '2.625rem;' }])};

  p {
    margin: 8px 0;
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.8;
  }
`

const MenuGrid = styled.div`
  display: grid;
  ${breakpointsUp('grid-template-columns', [
    { 0: 'minmax(159px, 1fr) minmax(159px, 1fr)' },
    { 1024: 'minmax(283px, 1fr) minmax(283px, 1fr) minmax(283px, 1fr)' },
    { 1536: 'minmax(289px, 1fr) minmax(289px, 1fr)' },
  ])};
  ${breakpointsUp('grid-template-rows', [
    { 0: ' 104px 104px 104px' },
    { 1024: ' 187px 187px' },
    { 1536: ' 187px 187px 187px' },
  ])};
  ${breakpointsUp('margin-bottom', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '25px' }])};
  ${breakpointsUp('grid-gap', [{ 0: '16px' }, { 1024: '24px' }])};
  > .button-container {
    position: relative;
    display: flex;
    > button {
      width: 100%;
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
      transition: all 0.15s cubic-bezier(0.5, 1, 0.25, 1);
      text-align: left;

      ${breakpointsUp('font-size', [{ 0: '1rem  !important' }, { 1024: '1.5rem  !important' }])};
      ${breakpointsUp('padding', [
        { 0: '12px 16px  !important' },
        { 1024: '20px 24px  !important' },
      ])};
      margin: 1px !important;
      &:hover {
        margin: 0 !important;
        border: 2px solid ${props => props.theme.palette.colors.formControl.hover.border} !important;
      }

      &.like {
        background-image: url('./icon-1_like.png');
      }
      &.reply {
        background-image: url('./icon-2_reply.png');
      }
      &.reply-thread {
        background-image: url('./icon-3_reply-to-thread.png');
      }
      &.analysis {
        background-image: url('./icon-4_token-analysis.png');
      }
      &.repost {
        background-image: url('./icon-5_retweet.png');
      }
      &.repost-comment {
        background-image: url('./icon-6_retweet_and_comment.png');
      }

      &.gray,
      &.Mui-disabled {
        filter: grayscale(1) brightness(0.9);
        opacity: 0.5;
      }
    }

    img {
      position: absolute;
      ${breakpointsUp('width', [{ 0: '64px' }, { 1024: '80px' }])};
      ${breakpointsUp('right', [{ 0: '-12px' }, { 1024: '-20px' }])};
      ${breakpointsUp('top', [{ 0: '-12px' }, { 1024: '-20px' }])};
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

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  color: ${props => props.theme.palette.warning.contrastText};
  background: ${props => props.theme.palette.warning.main};
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 1.125rem;
  text-transform: none;
`

const BlueButton = styled(ButtonBase)`
  color: ${props => props.theme.palette.primary.contrastText};
  background: ${props => props.theme.palette.primary.main};
  padding: 14px 18px 15px;
  border-radius: 100px;
  font-size: 1.125rem;
  font-weight: 600;
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

const SendButton = styled(BlueButton)`
  min-width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  padding: 0;
  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }
`

const HashText = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  align-items: center;

  > * {
    margin-left: 8px !important;
  }
`

const TxLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: 240px;
`

const PaperBox = styled(Paper)`
  border: 1px solid ${props => props.theme.palette.colors.formControl.border} !important;
  box-shadow: none;
  height: 82px;
  ${breakpointsUp('margin-bottom', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px' }])};

  &:focus,
  &:focus-visible,
  &:focus-within {
    border: 2px solid ${props => props.theme.palette.colors.formControl.focused.border} !important;
  }

  &.error {
    border-color: ${props => props.theme.palette.warning.main} !important;
  }
`

const DetailContainer = styled.div`
  min-height: 354px;
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  background: ${props => props.theme.palette.colors.tweetbox.background};
  ${breakpointsUp('border-radius', [{ 0: '8px' }, { 1024: '24px' }, { 1536: '24px' }])};
  ${breakpointsUp('margin-top', [{ 0: '24px' }, { 1024: '32px' }, { 1536: '0' }])};
  ${breakpointsUp('margin-left', [{ 0: '0' }, { 1024: '0' }, { 1536: '32px' }])};
`

const DetailBox = styled.div`
  ${breakpointsUp('font-size', [{ 0: ' 1rem' }, { 1024: ' 1.5rem' }])};
  font-weight: normal;
  line-height: 1.21;
  width: 100%;
  height: -webkit-fill-available;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    ${breakpointsUp('font-size', [{ 0: ' 1.5rem' }, { 1024: ' 2rem' }])};
    font-weight: bold;
    line-height: 1.19;
  }

  img {
    width: 192px;
    height: 192px;
  }
`

const TweetBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SuccessBox = styled(DetailBox)`
  ${TxLink} {
    &,
    *:last-child {
      margin-left: 8px;
      text-decoration: none;
      text-wrap-mode: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    ${breakpointsUp('display', [{ 0: ' block' }, { 1024: 'flex' }])};
    ${breakpointsUp('max-width', [{ 0: ' 200px' }, { 1024: ' 500px' }])};
    ${breakpointsUp('min-width', [{ 0: ' 200px' }, { 1024: ' 500px' }])};
  }

  ${BlueButton} {
    margin-top: 24px;
    margin-bottom: 24px;
    width: 192px;
  }

  img {
    width: 96px;
    height: 96px;
  }
`

const ErrorBox = styled(SuccessBox)`
  ${BlueButton} {
    margin-top: 24px;
    width: 138px;
  }
`

const EmptyCircle = styled.div`
  margin-bottom: 24px;
  ${breakpointsUp('width', [{ 0: '190px' }, { 1024: '192px' }])};
  ${breakpointsUp('height', [{ 0: '190px' }, { 1024: '192px' }])};
  border-radius: 192px;
  background-color: ${props => props.theme.palette.colors.formControl.autofill.background};
`
