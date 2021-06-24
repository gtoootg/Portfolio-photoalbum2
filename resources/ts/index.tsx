import React,{useState, createContext} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
 
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Map from './components/map/Map';

//createContext to controll State on global level
export const TravelPostsContext = createContext<any>({});
export const DummyTravelPostsContext = createContext<any>({});
export const uploadModalStateContext = createContext<any>({});
export const SelectedPostIdContext = createContext<any>({});
/////////////////////////////////////////////////

export type TravelPostObject = {
    id: number;
    region: string;
    country: string;
    title: string;
    image: any;
    latitude: number;
    longitude: number;
    created_at: number;
    updated_at: number;
}


export type SelectedPostIdObject = {
    selectedPostId?: number;
}

const App = () => {

    const [travelPosts, setTravelPosts] = useState<TravelPostObject[]>([]);
    const [dummyTravelPosts, setDummyTravelPosts] = useState<TravelPostObject[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<SelectedPostIdObject>({})

    return (
        <div>
            <BrowserRouter>
            <TravelPostsContext.Provider value={{travelPosts, setTravelPosts}}>
            <DummyTravelPostsContext.Provider value={{dummyTravelPosts, setDummyTravelPosts}}>
            <SelectedPostIdContext.Provider value={{selectedPostId,setSelectedPostId}}>
                <Route exact path="/" component={Home}/> 
                <Switch>
                <Route path="/detail" children={<Detail/>}/>
                <Route path="/map" children={<Map/>}/>
                </Switch> 
            </SelectedPostIdContext.Provider>
            </DummyTravelPostsContext.Provider>
            </TravelPostsContext.Provider>
            </BrowserRouter>
        </div>
    )
}
 
ReactDOM.render(
    <App />,
    document.getElementById('app')
)