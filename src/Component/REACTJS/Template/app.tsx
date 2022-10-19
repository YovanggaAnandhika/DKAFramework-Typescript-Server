import React from "react";
import {createRoot} from 'react-dom/client';
import Default from "./Routes/Default";

let container = document.getElementById('dka');
let DOM = createRoot(container!)
DOM.render(<Default/>)