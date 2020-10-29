import logo from './logo.svg';
import './App.css';
import {Penrose} from "./Penrose/recurse_sketch"
import React from 'react';
import { Card } from '@material-ui/core';
import { ColumnBody } from './ColumnBody';

function App() {
  return (
    <div className="App">
      <div style={{position: "absolute"}}>
        <Penrose/>
      </div>
      
      <ColumnBody>
        <Card style={{position: "absolute"}}>
          Hello World
        </Card>
      </ColumnBody>
    </div>
  );
}

export default App;
