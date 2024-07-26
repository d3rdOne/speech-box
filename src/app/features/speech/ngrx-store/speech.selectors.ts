import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SpeechState } from "./speech.reducers"
import { Speech } from "../../../core/models/speech"
import { SearchCategory } from "../../../core/enums/enums"

export const getSpeechState = createFeatureSelector<SpeechState>('speech')
export const getSpeeches = createSelector(getSpeechState, (state: SpeechState) => {
  let {term, category} = state.search;
  return state.speeches.filter(speech => {
    if(category === SearchCategory.KEYWORD) {
      return speech[category].map((s) => s.toLowerCase() === term.toLowerCase())
    }
    return speech[category].toLowerCase().includes(term.toLowerCase())
  })

})
export const getFavoriteSpeeches = createSelector(getSpeechState, (state: SpeechState) => {
  return state.speeches.filter((speech) => speech.favorite);
})

export const getSpeech = (id: number) => createSelector(getSpeechState, (state: SpeechState) => {
  return state.speeches.find(speech => speech.id == id)
})

export const getSelectedSpeechesCount = createSelector(getSpeechState, (state: SpeechState) => {
  return state.speeches.filter((speech) => speech.checked).length;
})

export const someSpeechSelected = createSelector(getSelectedSpeechesCount,getSpeechState , (count: number, state: SpeechState) => {
  return state.speeches.length > count && count > 0;
} )

export const allSpeechSelected = createSelector(getSelectedSpeechesCount,getSpeechState , (count: number, state: SpeechState) => {
  return state.speeches.length === count;
} )
