import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plane, LayoutDashboard, Plus, MessageSquare, FolderHeart,
  LogOut, MapPin, Calendar, DollarSign, Send, X, ChevronRight, Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Trip {
  id: string;
  destination: string;
  dates: string;
  budget: string;
  preferences: string;
  itinerary: string[];
  createdAt: string;
}

const mockItinerary = (dest: string) => [
  `Day 1: Arrive in ${dest}. Check into hotel. Evening city walk and dinner at a local restaurant.`,
  `Day 2: Morning guided tour of top attractions. Afternoon visit to local markets. Sunset viewpoint.`,
  `Day 3: Day trip to nearby landmarks. Lunch at a scenic spot. Evening cultural experience.`,
  `Day 4: Free morning for shopping/exploration. Afternoon museum visit. Farewell dinner.`,
  `Day 5: Checkout and departure. Optional morning activity before flight.`,
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "Hi! I'm your TripPilot AI assistant. Ask me anything about your trips!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [newTrip, setNewTrip] = useState({ destination: "", dates: "", budget: "", preferences: "" });
  const [activeTab, setActiveTab] = useState<"trips" | "saved" | "users">("trips");
  const [registeredUsers, setRegisteredUsers] = useState<{ name: string; email: string; created_at: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("trippilot_user");
    if (!stored) { navigate("/auth"); return; }
    setUser(JSON.parse(stored));
    const savedTrips = localStorage.getItem("trippilot_trips");
    if (savedTrips) setTrips(JSON.parse(savedTrips));

    supabase
      .from("users")
      .select("name, email, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setRegisteredUsers(data);
      });
  }, [navigate]);

  const saveTrips = (updated: Trip[]) => {
    setTrips(updated);
    localStorage.setItem("trippilot_trips", JSON.stringify(updated));
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const trip: Trip = {
      id: Date.now().toString(),
      ...newTrip,
      itinerary: mockItinerary(newTrip.destination),
      createdAt: new Date().toLocaleDateString(),
    };
    saveTrips([trip, ...trips]);
    setNewTrip({ destination: "", dates: "", budget: "", preferences: "" });
    setShowNewTrip(false);
    setSelectedTrip(trip);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: `Great question about "${userMsg}"! I'd recommend checking your itinerary for the best options. Would you like me to suggest alternatives?` },
      ]);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("trippilot_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Plane className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-sidebar-foreground">TripPilot AI</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => { setActiveTab("trips"); setSelectedTrip(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "trips" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`}
          >
            <LayoutDashboard className="w-4 h-4" /> My Trips
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "saved" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`}
          >
            <FolderHeart className="w-4 h-4" /> Saved Trips
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "users" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`}
          >
            <Users className="w-4 h-4" /> Registered Users
          </button>
          <button
            onClick={() => setShowChat(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> AI Assistant
          </button>
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sm font-semibold text-sidebar-primary">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors mt-1">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">TripPilot AI</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowChat(true)} className="p-2 text-muted-foreground"><MessageSquare className="w-5 h-5" /></button>
            <button onClick={handleLogout} className="p-2 text-muted-foreground"><LogOut className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {selectedTrip ? (
            /* Trip Detail */
            <div>
              <button onClick={() => setSelectedTrip(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
                ← Back to trips
              </button>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="font-display text-2xl font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> {selectedTrip.destination}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTrip.dates} · Budget: {selectedTrip.budget}</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display font-semibold text-lg mb-4">AI-Generated Itinerary</h2>
                <div className="space-y-4">
                  {selectedTrip.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
                        {i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground pt-1.5">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : showNewTrip ? (
            /* New Trip Form */
            <div>
              <button onClick={() => setShowNewTrip(false)} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
                ← Back
              </button>
              <h1 className="font-display text-2xl font-bold mb-6">Create New Trip</h1>
              <form onSubmit={handleCreateTrip} className="bg-card border border-border rounded-xl p-6 space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Paris, France" value={newTrip.destination} onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Travel Dates</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="June 15 - June 20, 2026" value={newTrip.dates} onChange={(e) => setNewTrip({ ...newTrip, dates: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="$2,000" value={newTrip.budget} onChange={(e) => setNewTrip({ ...newTrip, budget: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preferences</Label>
                  <Textarea placeholder="Adventure, local food, historical sites..." value={newTrip.preferences} onChange={(e) => setNewTrip({ ...newTrip, preferences: e.target.value })} />
                </div>
                <Button type="submit" size="lg" className="w-full">Generate Itinerary with AI</Button>
              </form>
            </div>
          ) : activeTab === "users" ? (
            /* Registered Users */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" /> Registered Users
                </h1>
                <span className="text-sm text-muted-foreground">{registeredUsers.length} total</span>
              </div>

              {registeredUsers.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">No users yet</h3>
                  <p className="text-sm text-muted-foreground">Sign-ups will appear here.</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                  {registeredUsers.map((u, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{u.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                      </div>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {new Date(u.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Trip List */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-bold">
                  {activeTab === "trips" ? "My Trips" : "Saved Trips"}
                </h1>
                <Button onClick={() => setShowNewTrip(true)} size="sm">
                  <Plus className="w-4 h-4" /> New Trip
                </Button>
              </div>

              {trips.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">No trips yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first AI-powered trip!</p>
                  <Button onClick={() => setShowNewTrip(true)}>
                    <Plus className="w-4 h-4" /> Create Trip
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {trips.map((trip) => (
                    <button
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className="text-left bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> {trip.destination}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{trip.dates}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Budget: {trip.budget}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">Created {trip.createdAt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* AI Chat Panel */}
      {showChat && (
        <div className="fixed inset-0 z-50 md:relative md:inset-auto md:w-80 md:border-l md:border-border flex flex-col bg-card">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> AI Assistant
            </h3>
            <button onClick={() => setShowChat(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              />
              <Button size="icon" onClick={handleSendChat}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
