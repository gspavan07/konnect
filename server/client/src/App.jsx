import React from "react";
import { Toaster, toast } from "sonner";

import { Link } from "react-router-dom";
const App = () => {
  const notify = () => {
    toast("hiiiiii");
  };
  return (
    <div>
      <Toaster />
      <Link to="/signup">App</Link>
      <button onClick={notify}>Click</button>
    </div>
  );
};

export default App;
