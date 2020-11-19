/* eslint-disable */
import React, { FC, useState } from "react"
import styled from "styled-components"
import * as I from "model/types"
import { DualSelect, Slider } from "view/components"
import { ArrowLeftS } from "@styled-icons/remix-line"
import { assumptions_props } from "controller/assumptions/assumptions_props"
import { store } from "index"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface IProps {}

export const AssumptionsPanel: FC<IProps> = () => {
  const [open, toggleOpen] = useState<boolean>(false)
  const [assumption, toggleAssumption] = useState<string>("rates")
  const [userName, toggleUser] = useState<string>()

  const { slidersArray, user1Name, user2Name } = assumptions_props(assumption, userName)

  //   <TransitionGroup component={null}>
  //   {isOpen && (
  //     <CSSTransition classNames="dialog" timeout={300}>
  //       <div className="dialog--overlay" onClick={onClose}>
  //         <div className="dialog">{message}</div>
  //       </div>
  //     </CSSTransition>
  //   )}
  // </TransitionGroup>


  const sliderValues = slidersArray[0].min
  console.log("slidersArray[0]:", sliderValues)
  return (
    <Wrapper>
      <Tabs open={open} assumption={assumption}>
        <DualSelect
          type={"tab"}
          handleChange={value => toggleAssumption(value)}
          handleChange2={value => toggleAssumption(value)}
          option1={"rates"}
          option2={"retirementFactors"}
          value={assumption === "rates"}
        />
        <UserSelector assumption={assumption}>
          <DualSelect
            type={"tab"}
            handleChange={value => toggleUser(value)}
            handleChange2={value => toggleUser(value)}
            option1={user1Name}
            option2={user2Name}
            value={userName === user1Name}
          />
        </UserSelector>
      </Tabs>
      <Panel open={open}>
        {!open && <Title onClick={() => toggleOpen(!open)}>Assumptions</Title>}
        {open && (
          <>
            <TransitionGroup component={null}>
              {assumption === "rates" ||
                (assumption === "retirementFactors" && (
                  <CSSTransition timeout={700} classNames="fade-in">
                    <Row>
                      {slidersArray.map(data => (
                        <Slider {...data} />
                      ))}
                    </Row>
                  </CSSTransition>
                ))}
              <ArrowLeft onClick={() => toggleOpen(!open)} />
            </TransitionGroup>
          </>
        )}
      </Panel>
    </Wrapper>
  )
}
//${props => (props.open ? "70rem" : "4rem")};
//  ${props => props.theme.neomorph}
//---------------------------STYLES-------------------------------------------//

interface Props {
  open?: boolean
  assumption?: string
}
const Wrapper = styled.div`
  position: absolute;
  top: 55rem;
  left: 0rem;
`
const Panel = styled.div<Props>`
  height: 20rem;
  width: ${props => (props.open ? "110rem" : "4rem")};
  justify-content: space-around;
  color: white;
  padding: 1rem;
  transition: all 0.5s ease;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  ${props => props.theme.neomorph};
`

const Title = styled.div`
  height: 5rem;
  width: 10rem;
  margin-top: 3rem;
  margin-left: -6rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${props => props.theme.color.darkGrey};
  transform: rotate(90deg);
  transition: all 0.5s ease;
`
const Tabs = styled.div<Props>`
  width: ${props => (props.open ? "70rem" : "0rem")};
  position: absolute;
  height: 4rem;
  top: -4.2rem;
  z-index: 5000;
  overflow: hidden;
  display: flex;
  transition: all 0.5s ease;
`

const Row = styled.div`
  display: flex;
  flex-wrap: start;
  flex-gap: 3rem;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  margin-left: 2rem;
  > * {
    margin-left: 1rem;
  }
`
const UserSelector = styled.div<Props>`
  width: ${props => (props.assumption === "retirementFactors" ? "35rem" : "0rem")};
  height: 3rem;
  transition: all 0.5s ease;
  overflow: hidden;
  position: absolute;
  top: 0.4rem;
  left: 2rem;
  position: relative;
`

const ArrowLeft = styled(ArrowLeftS)`
  height: 4.2rem;
  width: 4.2rem;
  color: #c8c7c7;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
`
