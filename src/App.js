import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUpModal from "./components/SignUpModal"
import SignInModal from "./components/SignInModal"
import Private from "./pages/private/Private"
import PrivateHome from "./pages/private/privateHome/PrivateHome"

function App() {
  console.log('app')
  return (
    <>
    <SignUpModal />
    <SignInModal />
    <Navbar /> {/* En mettant Navbar en dessous de SignUpModal on vient le mettre par dessus SignUpModal => éviter le fond transparent de SignUpModal sur la navbar*/}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/private" element={<Private />}>
        <Route path="/private/private-home" element={<PrivateHome />} />
    </Route>
    </Routes>
    </>
  ); 
}

export default App;
