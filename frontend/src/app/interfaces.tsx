//for auth slice

export interface AuthCounterState {
    user: unknown,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
};

//for sightings slice

export interface CounterState {
    sightings: unknown[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
};

//for createUpdateSighting
export interface FormState {
    date: string,
    time: string,
    location: string,
    species: string,
    images: string,
    description: string,
};

//login page
export interface LoginState{
    email:string,
    password:string,
  };

export interface RegisterState{
    name: string,
    email: string,
    password: string,
    password2: string,
};

