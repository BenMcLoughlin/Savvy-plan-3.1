/* eslint-disable */
import React, { FC } from "react"
import styled from "styled-components"
import spendingChartImage from "data/assets/spending.png"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
}

export const SpendingChart: FC<IProps> = ({ state, set }) => {
  //THIS IS JUST A PLACEHODLER FUNCTION FOR NOW
  const instance: any = Object.values(state.streams_reducer).filter((d: any) => d.id.includes("Spending"))[0]

  return (
    <Wrapper>
      <Img
        alt="#"
        src={require("data/assets/spending.png")}
        style={{ height: "20rem" }}
        onClick={() => {
          if (instance) set("selectedId", "ui_reducer", instance.id)
        }}
      />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
