import React,{useState, createContext} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
 
import Home from './components/home/Home';
import Detail from './components/detail/Detail';

//createContext to controll State on global level
export const TravelPostsContext = createContext<any>({});
export const uploadModalStateContext = createContext<any>({});
export const SelectedPostIdContext = createContext<any>({});
/////////////////////////////////////////////////

export type TravelPostObject = {
    id: number;
    region: string;
    country: string;
    title: string;
    image: any;
    latitude: string;
    longitude: string;
    created_at: any;
    updated_at: any;
}


export type SelectedPostIdObject = {
    selectedPostId?: number;
}

const App = () => {

    const [travelPosts, setTravelPosts] = useState<TravelPostObject[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<SelectedPostIdObject>({})

    return (
        <div>
            <BrowserRouter>
            <TravelPostsContext.Provider value={{travelPosts, setTravelPosts}}>
            <SelectedPostIdContext.Provider value={{selectedPostId,setSelectedPostId}}>
                <Route exact path="/" component={Home}/> 
                <Switch>
                <Route path="/detail" children={<Detail/>}/>
                </Switch> 
                </SelectedPostIdContext.Provider>
            </TravelPostsContext.Provider>
            </BrowserRouter>
        </div>
    )
}
 
ReactDOM.render(
    <App />,
    document.getElementById('app')
)