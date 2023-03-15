import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'
//import { FC } from 'react';
import sightingService from './sightingService'
import { CounterState } from '../../app/interfaces'

const initialState: CounterState = {
  sightings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Get all sightings
export const getSightings = createAsyncThunk(
  'sightings/getAll',
  async (thunkAPI:any): Promise<unknown> => {
    try {
      return await sightingService.getSightings()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    
    }
  }
)

//Create new Sighting

export const createSighting = createAsyncThunk(
  'sightings/create',

  async (sightingData: any, thunkAPI: any) => {

    try {
      //Get JSON Token user must be authenticated
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.createSighting(sightingData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get user specific sightings
export const getMySightings = createAsyncThunk('sightings/getMine',
  async (_, thunkAPI: any): Promise<unknown> => {

    try {
      //Get JSON Token user must be authenticated
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.getMySightings(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  })

//Delete user sighting
export const deleteSighting = createAsyncThunk(
  'sightings/delete',
  async (id: number, thunkAPI: any): Promise<unknown> => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.deleteSighting(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  }
)


export const sightingsSlice = createSlice({
  name: 'sightings',
  initialState,
  reducers: {
    reset: (initialState): CounterState => initialState,
  },
  extraReducers: (builder: any): void => {
    builder

      .addCase(createSighting.pending, (state: CounterState): void => {
        state.isLoading = true
      })
      .addCase(createSighting.fulfilled, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(createSighting.rejected, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

      })
      //Get user specifc sightings for sightings dashboard
      .addCase(getMySightings.pending, (state: CounterState): void => {
        state.isLoading = true
      })
      .addCase(getMySightings.fulfilled, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(getMySightings.rejected, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //End User Specific slice settings

      .addCase(getSightings.pending, (state: CounterState): void => {
        state.isLoading = true
      })
      .addCase(getSightings.fulfilled, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(getSightings.rejected, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSighting.pending, (state: CounterState): void => {
        state.isLoading = true
      })
      .addCase(deleteSighting.fulfilled, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = state.sightings.filter(
          //can't figure out the type for this one. The ids are numbers, but it throws errors when I put number in
          (sighting: any): any => sighting._id !== action.payload.id
        )
      })
      .addCase(deleteSighting.rejected, (state: CounterState, action: AnyAction): void => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = sightingsSlice.actions
export default sightingsSlice.reducer
