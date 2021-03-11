//import { useState, useEffect } from "react";
import useFetch from "./useFetch";

//Json server considers the top level property as a resource. It creates end points to interact with them.
//npx json-server --watch data/db.json --port 8000
// /blogs = Get = Fetch all blogs
// /blogs/{id} = Get = Fetch a single blog
// /blogs = Post = Add a new blog
// /blogs/{id} = Delete = Delete a blog
const Home = () => {
  const {data: location, isPending, error} = useFetch('https://api.thingspeak.com/channels/1271022/feeds.json?results=2');
  var obj;
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading....</div>}
      {/*blogs is null intially so the below statement only renders when blogs data has been fetched!*/}
      <div>Meow</div>
      {console.log(location)}
      {obj = JSON.parse(location.feeds)}
      {console.log(obj)}
    </div>
  );
}
 
export default Home;