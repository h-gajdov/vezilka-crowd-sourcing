import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { Menu, X } from "lucide-react";
// import LanguageToggle from "../components/LanguageToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <NavLink to="/" className="text-xl font-bold text-gradient">
                    Везилка
                </NavLink>

                <div className="hidden md:flex items-center gap-6">
                    <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Како функционира
                    </a>
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Можности
                    </a>
                    <NavLink to="/login">
                        <Button variant="ghost" size="sm">Најава</Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button size="sm">Започни</Button>
                    </NavLink>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-border bg-background p-4 space-y-3 animate-fade-in">
                    <a href="#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Како функционира</a>
                    <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Можности</a>
                    <NavLink to="/login" onClick={() => setOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">Најава</Button>
                    </NavLink>
                    <NavLink to="/register" onClick={() => setOpen(false)}>
                        <Button size="sm" className="w-full">Започни</Button>
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

