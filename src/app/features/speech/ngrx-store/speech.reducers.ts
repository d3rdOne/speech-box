import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Speech } from "../../../core/models/speech";
import * as SpeechActions from './speech.actions';
import { initial } from "lodash-es";
import { SearchCategory } from "../../../core/enums/enums";
import { Search } from "../../../core/models/search";

export const speechReducerKey = 'speech';

export interface SpeechState {
  speeches: Speech[];
  search: Search;
}

export const initialState: SpeechState = {
  speeches: [],
  search: {term: '', category: SearchCategory.CONTENT}
}

export const speechReducer = createReducer(
  initialState,
  on(SpeechActions.storeSpeechList,
    (state, {speeches} ) => ({...state, speeches: speeches })
  ),
  on(SpeechActions.updateSearch, (state, {search}) => {
    return {...state, search: {...search}}
  }),
  on(SpeechActions.addSpeech,
    (state, {speech}) => {
      let newSpeeches = state.speeches;
      newSpeeches = [...newSpeeches, speech]
      return {...state, speeches: newSpeeches}
    }
  ),
  on(SpeechActions.updateSpeech,
    (state, {speech}) => {
      let newSpeeches = state.speeches;
      return {...state, speeches: newSpeeches.map(currentSpeech => {
        if(currentSpeech.id == speech.id) {
          return {...currentSpeech, ...speech}
        }
        return currentSpeech;
      })};
    }
  ),
  on(SpeechActions.toggleSpeech,
    (state, {id, checked}) => {
      let newSpeeches = state.speeches;

      return {...state, speeches: newSpeeches.map(speech => {
        if(speech.id == id) return {...speech, checked: checked};
        return speech;
      })}
    }
  ),
  on(SpeechActions.toggleAllSpeech, (state, {checked}) => {
    let newSpeeches = state.speeches;
    return {...state, speeches: newSpeeches.map(speech => {
      return  {...speech, checked: checked}
    })}
  }
  ),
  on(SpeechActions.deleteSpeech, (state ,{id}) => {
    let newSpeeches = state.speeches;
    newSpeeches = newSpeeches.filter((speech) => speech.id != id)
    return {...state, speeches: newSpeeches};
  }),
  on(SpeechActions.deleteMultipleSpeech, (state) => {
    let newSpeeches = state.speeches;
    newSpeeches = newSpeeches.filter(speech => !speech.checked)
    return {...state, speeches: newSpeeches}
  }),
  on(SpeechActions.toggleFavoriteSpeech, (state, {id, favorite}) => {
    let newSpeeches = state.speeches;
    return {...state, speeches: newSpeeches.map(speech => {
      if(speech.id == id) return {...speech, favorite: favorite}
      return speech
    })};
  })

)
