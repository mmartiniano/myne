import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState(() => {
        const stored = localStorage.getItem(key);
        
        if (stored)
            return JSON.parse(stored);

        return initialState;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state])

    return [state, setState];
}

export default usePersistedState;