import './App.css';
import CowList from "./components/CowList";
import CowDetail from "./components/CowDetail";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/cowdetail/">
                        <CowDetail/>
                    </Route>
                    <Route path="/">
                        <CowList/>
                    </Route>
                </Switch>
            </div>
        </Router>

    </div>
  );
}

export default App;
