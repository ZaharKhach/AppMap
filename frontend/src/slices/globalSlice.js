import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const myStorage = window.localStorage;

const initialState = {
    currentUser: myStorage.getItem('user'),
    pins: [],
    currentPlaceId: "",
    newPlace: null,
    newPlaceData: {
        title: "",
        desc: "",
        rating: ""
    },
    showRegister: false,
    showLogin: false,
    error: false,
    success: true,
    view: {
        longitude: 33.2304,
        latitude: 48.5,
        zoom: 5,
    },
    loadingStatus: 'idle'
};

export const fetchPins = createAsyncThunk('globalSlice/pins', async () => {
    const response = await axios.get("/pins");
    console.log(response)
    return response.data;
});
export const newPin = createAsyncThunk('globalSlice/newPin', async (newPin) => {
    const response = await axios.post("/pins", newPin);
    return response.data;
});
export const userLogined = createAsyncThunk('globalSlice/login', async (user) => {
    const response = await axios.post("./users/login", user);
    return response.data;
});
export const userRegistered = createAsyncThunk('globalSlice/register', async (newUser) => {
    const response = await axios.post("./users/register", newUser);
    return response.data;
})

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        currentPlaceSelected: (state, action) => {
            const id = action.payload;
            state.currentPlaceId = id;
            console.log(state.currentPlaceId)
        },
        newPlaceAdded: (state, action) => {
            state.newPlace = action.payload;
        },
        newPlaceClosed: (state) => {
            state.newPlace = null;
        },
        loginButtonClicked: (state) => {
            state.showLogin == true ? state.showLogin = false : state.showLogin = true
        },
        regButtonClicked: state => {
            state.showRegister == true ? state.showRegister = false : state.showRegister = true
        },
        logoutButtonCliked: state => {
            myStorage.removeItem('user');
            state.currentUser = null;
        },
        newPinTitle: (state, action) => {
            state.newPlaceData = {
                ...state.newPlaceData,
                title: action.payload
            }
        },
        newPinDesc: (state, action) => {
            state.newPlaceData = {
                ...state.newPlaceData,
                desc: action.payload
            }
        },
        newPinRating: (state, action) => {
            state.newPlaceData = {
                ...state.newPlaceData,
                rating: action.payload
            }
        },
        setViewState: (state, action) => {
            state.view = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPins.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchPins.fulfilled, (state, action) => {
                state.pins = action.payload;
            })
            .addCase(newPin.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(newPin.fulfilled, (state, action) => {
                state.pins.push(action.payload);
                state.newPlace = null;
            })
            .addCase(userLogined.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(userLogined.fulfilled, (state, action) => {
                myStorage.setItem("user", action.username);
                state.currentUser = action.username;
                state.showLogin = false;
                state.error = false
            })
            .addCase(userLogined.rejected, (state) => {
                state.error = true;
                state.success = false;
            })
            .addCase(userRegistered.pending, state => {
                state.loading = 'loading'
            })
            .addCase(userRegistered.fulfilled, (state) => {
                state.error = false;
                state.success = true
            })
            .addCase(userRegistered.rejected, (state) => {
                state.error = true;
                state.success = false;
            })
    }
});

export const selectPins = state => state.globalSlice.pins;
export const selectView = state => state.globalSlice.view;
export const selectZoom = createSelector(
    selectView,
    (state) => state.zoom
);
export const selectCurrentUser = state => state.globalSlice.currentUser;
export const selectCurrentPlaceId = state => state.globalSlice.currentPlaceId;
export const selectNewPlace = state => state.globalSlice.newPlace;

export const selectNewPlaceData = state => state.globalSlice.newPlaceData;



export const {
    currentPlaceSelected,
    newPlaceAdded,
    newPlaceClosed,
    loginButtonClicked,
    regButtonClicked,
    logoutButtonCliked,

    newPinTitle,
    newPinDesc,
    newPinRating,

    setViewState
} = globalSlice.actions;
export default globalSlice.reducer;