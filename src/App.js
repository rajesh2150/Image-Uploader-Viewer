import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import UploadPage from "./components/Upload/UploadPage";

function App() {
  return (
    <div className="App">
      
        <UploadPage />
        <hr/>
        <Authentication/>
    </div>
  );
}

export default App;
