import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">TripPilot AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link to="/auth?signup=true">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-border px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>How It Works</a>
          <a href="#testimonials" className="block text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>Testimonials</a>
          <div className="flex gap-2 pt-2">
            <Link to="/auth"><Button variant="ghost" size="sm">Log In</Button></Link>
            <Link to="/auth?signup=true"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
