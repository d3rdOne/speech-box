import { createAction, props } from "@ngrx/store";
import { Speech } from "../../../core/models/speech";
import { create } from "lodash-es";
import { Search } from "../../../core/models/search";


export const storeSpeechList = createAction(`[Speech Page] Load Speeches`, props<{speeches: Speech[]}>());
export const updateSearch = createAction(`[Speech Page] Update Search`, props<{search: Search}>());
export const addSpeech = createAction(`[Speech Page] Add Speech`, props<{speech: Speech}>())
export const updateSpeech = createAction(`[Speech Page] Update Speech`, props<{speech: Speech}>());
export const toggleSpeech = createAction(`[Speech Page] Toggle Speech`, props<{id:  number, checked: boolean}>())
export const toggleAllSpeech = createAction(`[Speech Page] Toggle All Speech`, props<{checked: boolean}>())
export const deleteSpeech = createAction(`[Speech Page] Delete Speech`, props<{id: number}>());
export const deleteMultipleSpeech = createAction(`[Speech Page] Delete multiple Speech`);
export const toggleFavoriteSpeech = createAction(`[Speech Page] Toggle Favorite a Speech`, props<{id: number, favorite: boolean }>())
