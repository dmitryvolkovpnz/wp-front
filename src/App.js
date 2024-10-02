import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import Login from "./Login";
import NewPost from "./NewPost";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    setToken(jwtToken);
  }, []);

  return (
      <BrowserRouter>
        {token ? <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<PostList/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/newpost" element={<NewPost token={token}/>}/>
            <Route path="/post/:id" element={<PostDetail/>}/>
          </Routes>
          <Footer/>
        </div> : <div>
          <Login/>
        </div>}
      </BrowserRouter>
  );
}

export default App;
