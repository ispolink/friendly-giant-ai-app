import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const MOBILE_SCREEN_WIDTH = 414
export const TABLET_SCREEN_WIDTH = 1024
export const DESKTOP_M_SCREEN_WIDTH = 1536
export const TDESKTOP_L_SCREEN_WIDTH = 1920

export const breakpointsDown = (
  cssProp = 'padding', // the CSS property to apply to the breakpoints
  values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType = 'max-width' // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const [screenBreakpoint, cssPropBreakpoint] = [Object.keys(value)[0], Object.values(value)[0]]
    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint};
    }
    `)
  }, '')
  return css([breakpointProps])
}

export const breakpointsUp = (
  cssProp = 'padding', // the CSS property to apply to the breakpoints
  values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType = 'min-width' // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const [screenBreakpoint, cssPropBreakpoint] = [Object.keys(value)[0], Object.values(value)[0]]
    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint};
    }
    `)
  }, '')
  return css([breakpointProps])
}

export const MobileViewWrapper = styled(({ ...props }) => <Box {...props} />)`
  display: none;
  @media screen and (max-width: ${TABLET_SCREEN_WIDTH - 1}px) {
    display: inherit;
  }
`

export const TabeltMobileViewWrapper = styled(({ ...props }) => <Box {...props} />)`
  display: none;
  @media screen and (max-width: ${DESKTOP_M_SCREEN_WIDTH - 1}px) {
    display: inherit;
  }
`

export const DesktopTabeltViewWrapper = styled(({ ...props }) => <Box {...props} />)`
  display: none;
  @media screen and (min-width: ${TABLET_SCREEN_WIDTH}px) {
    display: inherit;
  }
`

export const DesktopViewWrapper = styled(({ ...props }) => <Box {...props} />)`
  display: none;
  @media screen and (min-width: ${DESKTOP_M_SCREEN_WIDTH}px) {
    display: inherit;
  }
`

export const useSize = ref => {
  const [size, setSize] = React.useState()

  const observer = useRef(
    new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        if (entries.length) {
          setSize(entries[0].contentRect)
        }
      })
    })
  )

  useEffect(() => {
    if (ref.current) {
      observer.current.observe(ref.current)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current && observer.current && observer.current.unobserve(ref.current)
    }
  }, [ref, observer])

  return size
}
