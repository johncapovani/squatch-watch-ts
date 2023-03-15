//Doesn't need any TS
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
//Import auth slice
import authReducer from '../features/auth/authSlice'
import sightingsReducer from '../features/sightings/sightingSlice'

export const store = configureStore({

    reducer: {
        
        auth: authReducer,
        sightings: sightingsReducer

    },


})

//for typing thunks
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
AnyAction
>
//Note that this assumes that there is no meaningful return value from the thunk.
//If your thunk returns a promise and you want to use the returned promise after dispatching the thunk,
//you'd want to use this as AppThunk<Promise<SomeReturnType>>.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch