import React from 'React';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Navbar from './Navbar';
import Top from './Top';
import Detail from './Detail';
import { Declaration } from 'postcss';


function App(){
    return(
        <div >
        <BrowserRouter>
            <Navbar/>
            <Route exact path="/" component={Top}/>       
            <Switch>
                <Route path="/detail/:id" children={<Detail/>}/>
            </Switch> 
        </BrowserRouter> 
        </div>
    )
}

if(document.getElementById('app')){
    ReactDOM.render(<App/>, document.getElementById('app'));
}