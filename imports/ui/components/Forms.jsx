import { Meteor } from 'meteor/meteor'
import { Card as UnstyledCard, Button as UnstyledButton, Elevation, Typography, Grid, GridCell } from 'rmwc'
import React from 'react'
import styled, { css } from 'styled-components'

/**
 * Big large button, hard to miss
 */
export const BigButton = styled(UnstyledButton)`
  height: auto !important;
  padding: 20px !important;
  line-height: 1.5rem !important;
  font-size: 1.25rem !important;
  margin-bottom: 1rem !important;
`

export const UnstyledForm = ({ children, ...rest }) =>
  <form {...rest}>
    {children}
  </form>

/**
 * 100% width form, including its elements
 */
export const FullWidthForm = styled(UnstyledForm)`
  padding: 0;
  width: 100%;

  // Add margin under elements, but not the last one
  .mdc-text-field,
  .mdc-text-area,
  .mdc-textarea,
  .react-phone-number-input {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    +.mdc-typography--caption {
      margin-top: 0;
      margin-bottom: 1rem;
    }

  }

  // Make elements 100% width
  .mdc-text-field,
  .mdc-text-area,
  .mdc-button {
    width: 100%;
  }

  // Center text in form fields properly
  .mdc-text-field--outlined .mdc-text-field__input {
    padding: 14px 16px 12px 16px;
  }
`

export const Form = ({ fullWidth, ...rest }) =>
  fullWidth ?
    <FullWidthForm {...rest} />
    : <UnstyledForm {...rest} />

/**
 * Error notice in a form
 */
const Notice = ({ text, ...rest }) => 
  <Elevation z={8} wrap>
    <UnstyledCard {...rest}>
      <Typography use='body2' tag='p'>{text}</Typography>
    </UnstyledCard>
  </Elevation>

export const ErrorNotice = styled(Notice)`

  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  background-color: var(--mdc-theme-error) !important;

  p {
    color: white;

    a {
      color: white;
      font-weight: bold;

      &:hover {
        opacity: 0.85;
      }
    }
  }

`

/**
 * Full width button
 */
export const StickyNavButton = styled(UnstyledButton)`
  width: 100%;
  font-weight: bold !important;
  font-size: 16px !important;
  line-height: 16px !important;
  height: 48px !important;
  padding: 8px 12px !important;
  &:disabled {
    background: #ccc;
  }
`

export const StickyNav = styled(({ index, max, prevTitle, nextTitle, finishTitle, onPrevious, onNext, className }) => 
  <Grid className={className}>
    <GridCell desktop={6} tablet={4} phone={2}>
      <StickyNavButton
        disabled={index === 0 ? 'disabled' : ''}
        onClick={onPrevious}
        label={prevTitle}
        unelevated
      />
    </GridCell>
    <GridCell desktop={6} tablet={4} phone={2}>
      <StickyNavButton
        onClick={onNext}
        label={index + 1 === max ? finishTitle : nextTitle}
        unelevated
      />
    </GridCell>
  </Grid>
)`
  padding: 8px !important;  
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 64px;
  background: white !important;

  .mdc-layout-grid__inner {
    background: white !important;
    grid-gap: 8px;
  }
`