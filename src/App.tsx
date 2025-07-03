
import './App.css'
import NestedSidebar from "./Components/Header.tsx";
import PrimaryDrawer from "./Components/PrimaryDrawer.tsx";

function App() {

  return (
      <div>
          <PrimaryDrawer/>
        <NestedSidebar />
      </div>

  )
}

export default App
