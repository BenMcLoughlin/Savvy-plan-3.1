import { IUiState } from "model/types/reducer_types"

const initialState: IUiState = {
  change: false,
  selectedId: "",
  selectedScenario: 1,
  selectedPeriod: 0,
  colorIndex: 0,
  videoUrl: "",
  progress: 9,
  selectedPage: "savings",
  selectedAccount: "tfsa",
  selectedUser: "user1",
  dualSelectValue: true,
  savingsTransaction: "contribute",
  newStream: false,
  scenarios: 3,
  scenarioLabel1: "basic",
  scenarioLabel2: "Spender",
  scenarioLabel3: "Saver",
}

export function ui_reducer(state: IUiState = initialState, action: any): IUiState {
  switch (action.type) {
    case "ui_reducer/SET_VALUE":
      return { ...state, [action.id]: action.value } //sets a simple id value pair within the reducer object
    default:
      return state
  }
}



