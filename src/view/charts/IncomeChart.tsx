/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import { drawBarChart } from "view/charts/createChartFunctions/createBarChart"
import * as I from "model/types"
import { buildIncomeForcast } from "model/calculations/income/income"
import { getTargetIncome } from "model/calculations/income/targetIncome/targetIncome.function"

interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  enableNav?: boolean
}

export const IncomeChart: FC<IProps> = ({ color_selector, enableNav, state, set }) => {

  const { selectedUser } = state.ui_reducer
  const inputRef = useRef(null)
  const className = "incomeChart"
  const { chartArray, inc } = useMemo(() => buildIncomeForcast(state), [state.stream_reducer, selectedUser])
  const { chartArray2 } = useMemo(() => getTargetIncome(inc, state), [state.stream_reducer, selectedUser])

  useEffect(() => {

    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawBarChart(color_selector, className, chartArray, inc, height, set, state, width)
    }
  }, [color_selector, chartArray, set, selectedUser, state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef} />
      {enableNav && (
        <ChartNavWrapper>
          <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
        </ChartNavWrapper>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 110rem;
  height: 23rem;
  ${props => props.theme.neomorph};
  border-radius: 15px;
`
const Canvas = styled.div`
  width: 90rem;
  height: 20rem;
  position: absolute;
`

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 0rem;
  left: 4rem;
`
