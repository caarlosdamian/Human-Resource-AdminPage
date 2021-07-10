import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Employee from "./components/pages/Employees";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Employees" exact component={Employee} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
