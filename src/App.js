import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/Home';
import Post from './view/Post';
import Comments from './view/Comments';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
            <Switch>
            <Route  exact path="/"component={Home} />
            <Route  exact path="/user/posts/:id"component={Post} />
            <Route  exact path="/user/post/comment/:id"component={Comments} />

              </Switch>
              </BrowserRouter>
    </div>
  );
}

export default App;
