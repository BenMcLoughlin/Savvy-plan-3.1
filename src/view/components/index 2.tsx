import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { EditPanel as _EditPanel } from "./cards/EditPanel"
import { Header as _Header } from "./layout/Header"
import { Login as _Login } from "./login/Login"
import * as I from "types"
//Import Selectors
import { income_selector, color_selector } from "selectors/income_selector"

import { IncomeChart as _IncomeChart } from "charts/IncomeChart"
import { SavingsChart as _SavingsChart } from "charts/SavingsChart"
import { NetWorthChart as _NetWorthChart } from "charts/NetWorthChart"
import { TaxesChart as _TaxesChart } from "charts/TaxesChart"
import { SpendingChart as _SpendingChart } from "charts/SpendingChart"

const mapStateToProps = (state: I.state) => ({
  state,
  income_selector: income_selector(state),
  color_selector: color_selector(state),
})


//Buttons
export { AddButton } from "./buttons/AddButton"
export { AddPrompt } from "./buttons/AddPrompt"
export { Back } from "./buttons/Back"
export { Button } from "./buttons/Button"
export { LinkButton } from "./buttons/LinkButton"
export { Exit } from "./buttons/Exit"
export { Next } from "./buttons/Next"

//Cards
export { Comment } from "./cards/Comment"
export { InfoCard } from "./cards/InfoCard"
export { TripleSliderSelector } from "./cards/TripleSliderSelector"

//Dropdowns
export { ColorSelect } from "./dropdowns/ColorSelect"
export { Dropdown } from "./dropdowns/Dropdown"

//layout
export const Header = compose(connect(mapStateToProps, { set, remove }))(_Header)
export { Footer } from "./layout/Footer"

//login
export const Login = compose(connect(mapStateToProps, { set, remove }))(_Login)

//Nav
export { ChartNav } from "./nav/ChartNav"
export { HeaderNav } from "./nav/HeaderNav"
export { ProgressBar } from "./nav/ProgressBar"
export { SideNav } from "./nav/SideNav"
export { TripleSelector } from "./nav/TripleSelector"

//Options
export { DualSelect } from "./options/DualSelect"
export { PickMultipleOptions } from "./options/PickMultipleOptions"
export { PickNumber } from "./options/PickNumber"
export { PickSingleOption } from "./options/PickSingleOption"
export { PickNumberWithText } from "./options/PickNumberWithText"

//Scroll
export { ScrollCircles } from "./scroll/ScrollCircles"

//Sliders
export { MultiSliders } from "./sliders/MultiSliders"
export { Slider } from "./sliders/Slider"

//Text Input

export { EditTitle } from "./textInput/EditTitle"
export { MultipleTextInput } from "./textInput/MultipleTextInput"
export { TextInput } from "./textInput/TextInput"

//Smart Components Connected to Redux

export const EditPanel = compose(connect(mapStateToProps, { set, remove }))(_EditPanel)


export const IncomeChart = compose(connect(mapStateToProps, { set }))(_IncomeChart)
/**
 * The <SavingsChart> renders a chart showing the users savings from age 18-95.
 *  */

export const SavingsChart = compose(connect(mapStateToProps, { set }))(_SavingsChart)

/**
 * The <NetWorthChart> renders a chart showing the users net worth from current age until  95.
 *  */

export const NetWorthChart = compose(connect(mapStateToProps, { set }))(_NetWorthChart)
/**
 * The <TaxesChart> renders a chart showing the users Taxes from current age until  95.
 *  */

export const TaxesChart = compose(connect(mapStateToProps, { set }))(_TaxesChart)
/**
 * The <SpendingChart> renders a chart showing the users spending from current age until  95.
 *  */

export const SpendingChart = compose(connect(mapStateToProps, { set }))(_SpendingChart)
