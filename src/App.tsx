import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/ui/Navbar";
function App() {
    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // higher = smoother
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
      smoothWheel: true,
      
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <BrowserRouter>
      {" "} <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
