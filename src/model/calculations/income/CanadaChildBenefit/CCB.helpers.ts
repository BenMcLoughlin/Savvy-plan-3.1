import * as I from "model/types"

export const getYearRange = (state: I.state): I.objects => {
  const { user_reducer } = state

  const kidsIdArray: string[] = Object.keys(user_reducer).filter(d => d.startsWith("child")) //every time a new child is added a value of "child1BirthYear" is added to the user_reducer, the number changes, this collects all the children added with their user ids
  const kidsBirthYearArray: number[] = kidsIdArray.map((d: string) => user_reducer[d])
  const yearFirstChildBorn:number = user_reducer[kidsIdArray[0]] //this uses the key "child1BirthYear" to find the year of the first child
  const yearLastChildLeaves:number = user_reducer[kidsIdArray[kidsIdArray.length - 1]] + 17 //finds the year of the last child and 1dds 17 for when they are no longer eligable

  return { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray }
}
