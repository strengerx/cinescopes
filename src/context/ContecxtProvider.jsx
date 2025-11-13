import { createContext, useContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext(null);

export const THEME_ACTIONS = {
    TOGGLE: "TOGGLE",
    SET_DARK: "SET_DARK",
    SET_LIGHT: "SET_LIGHT",
};

function getInitialTheme() {
    if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    }
    return "light";
}

function reducer(state, action) {
    switch (action.type) {
        case THEME_ACTIONS.TOGGLE:
            return { theme: state.theme === "dark" ? "light" : "dark" };
        case THEME_ACTIONS.SET_DARK:
            return { theme: "dark" };
        case THEME_ACTIONS.SET_LIGHT:
            return { theme: "light" };
        default:
            return state;
    }
}

export default function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { theme: getInitialTheme() });

    useEffect(() => {
        localStorage.setItem("theme", state.theme);
        // document.documentElement.setAttribute("data-theme", state.theme);
        document.body.classList.toggle("dark", state.theme === "dark");
    }, [state.theme]);

    const toggleTheme = () => dispatch({ type: THEME_ACTIONS.TOGGLE });
    const setDark = () => dispatch({ type: THEME_ACTIONS.SET_DARK });
    const setLight = () => dispatch({ type: THEME_ACTIONS.SET_LIGHT });

    return (
        <ThemeContext.Provider value={{ theme: state.theme, toggleTheme, setDark, setLight }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
