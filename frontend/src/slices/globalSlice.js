import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const entityAdapter = createEntityAdapter();

const myStorage = window.localStorage;

const initialState = entityAdapter.getInitialState({
    currentUser: myStorage.getItem('user'),
    pins: [],
    currentPlaceId: "",
    newPlace: null,
    title: "",
    desc: "",
    rating: "",
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
});

export const fetchPins = createAsyncThunk('globalSlice/pins', async () => {
    const response = await axios.get("/pins");
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
            setTimeout(() => {
                state.currentPlaceId = id;
            }, 10);
        },
        currentPlaceClosed: (state) => {
            state.currentPlaceId = null;
        },
        newPlaceAdded: (state, action) => {
            const { lng, lat } = action.payload;
            console.log("Clicked coordinates:", lng, lat);
            state.newPlace = {
                lng, lat
            }
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
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPins.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchPins.fulfilled, (state, action) => {
                const pins = {};
                action.payload.forEach(pin => {
                    pin[pin.id] = pin
                });
                state.loadingStatus = 'idle'
                state.entities = pins;
            })
            .addCase(newPin.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(newPin.fulfilled, (state, action) => {
                state.pins = [...state.pins, action.payload];
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

export default globalSlice.reducer;