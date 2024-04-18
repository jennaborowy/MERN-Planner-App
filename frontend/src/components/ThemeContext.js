import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleDark = () => {
        if (theme === "light")
            setTheme("dark");
    };

    const toggleLight = () => {
        if (theme === "dark")
            setTheme("light");
    }

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleDark, toggleLight }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
