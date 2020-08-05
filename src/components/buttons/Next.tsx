import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { ArrowRightCircle } from "@styled-icons/remix-fill/ArrowRightCircle"

interface IProps {
  setDirection: (value: string) => void
  handleChange: (setDirection: any, valid: boolean) => void
  valid: boolean
  state: any
}

export const Next: FC<IProps> = ({ handleChange, setDirection, valid, state }) => {

  useEffect(() => {
    const pressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
          handleChange(setDirection, valid)
      }
    }
    if (valid) {
      window.addEventListener("keydown", pressEnter)
      return () => window.removeEventListener("keydown", pressEnter)
    }
  }, [handleChange, setDirection, valid, state])

  return (
    <Wrapper>
      <ArrowRight valid={valid} onClick={() => {
        setDirection("forward")
        handleChange(setDirection, valid)}}
        id="nextButton"
        />
      {valid && <p>Press Enter</p>}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  top: 18rem;
  right: 8%;
`

interface ArrowProps {
  valid: boolean
}
const ArrowRight = styled(ArrowRightCircle)<ArrowProps>`
  color: ${props => (props.valid ? "#9AC0CD" : "#C8C7C7")};
  cursor: ${props => (props.valid ? "pointer" : null)};
  height: 7.2rem;
  width: 7.2rem;
`
