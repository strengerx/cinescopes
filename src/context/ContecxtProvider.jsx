import { createContext, useContext, useReducer, useEffect, useState } from "react";

// 1️⃣ Create Theme Context
export const ThemeContext = createContext(null);

// 2️⃣ Define action types
export const THEME_ACTIONS = {
    TOGGLE: "TOGGLE",
    SET_DARK: "SET_DARK",
    SET_LIGHT: "SET_LIGHT",
};

// 3️⃣ Safely get initial theme (system + localStorage)
function getInitialTheme() {
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    } catch {
        // In case localStorage access fails (some browsers in incognito)
        return "light";
    }
}

// 4️⃣ Reducer to handle theme actions
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

// 5️⃣ Theme Provider Component
export default function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, null, () => ({
        theme: getInitialTheme(),
    }));

    // (Optional) small delay to avoid flicker on mount
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    // 6️⃣ Sync theme to localStorage and <body> class
    useEffect(() => {
        localStorage.setItem("theme", state.theme);

        if (state.theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [state.theme]);

    // 7️⃣ Exposed actions
    const toggleTheme = () => dispatch({ type: THEME_ACTIONS.TOGGLE });
    const setDark = () => dispatch({ type: THEME_ACTIONS.SET_DARK });
    const setLight = () => dispatch({ type: THEME_ACTIONS.SET_LIGHT });

    // 8️⃣ Optional auto-sync with OS preference
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            dispatch({
                type: e.matches ? THEME_ACTIONS.SET_DARK : THEME_ACTIONS.SET_LIGHT,
            });
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    // 9️⃣ Prevent UI flash before theme applies
    if (!isMounted) return null;

    // 🔟 Provide context
    return (
        <ThemeContext.Provider
            value={{
                theme: state.theme,
                toggleTheme,
                setDark,
                setLight,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

// 11️⃣ Custom Hook for easy access
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
