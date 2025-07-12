import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ProgressBar } from "@/components/ProgressBar";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Browse from "@/pages/browse";
import ItemDetail from "@/pages/item-detail";
import Dashboard from "@/pages/dashboard";
import AddItem from "@/pages/add-item";
import AdminPanel from "@/pages/admin-panel";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <Switch>
      {isLoading ? (
        <Route path="/" component={Landing} />
      ) : !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/items/:id" component={ItemDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/add-item" component={AddItem} />
          {(user as any)?.isAdmin && <Route path="/admin" component={AdminPanel} />}
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScrollProvider>
          <ProgressBar />
          <Toaster />
          <Router />
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
