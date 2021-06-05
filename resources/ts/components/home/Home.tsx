import React, {useState, useEffect, createContext}from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Head from '../common/Head';
import UploadModal from '../common/UploadModal';
import SortModal from '../common/SortModal';
import Main from '../common/Main';

import styles from '../../../styles/home.module.scss';

//createContext to controll State on global level
export const uploadModalStateContext = createContext<any>({});
export const sortModalStateContext = createContext<any>({});
/////////////////////////////////////////////////


const Home = ()=> {

    const [uploadModalState, setUploadModalState] = useState<boolean>(false);
    const [sortModalState, setSortModalState] = useState<boolean>(false);

    return (
        <div className={styles.home}> 
            <uploadModalStateContext.Provider value ={{uploadModalState, setUploadModalState}}>
            <sortModalStateContext.Provider value ={{sortModalState, setSortModalState}}>
                    <UploadModal/>
                    <SortModal/>
                    <Head unusedIconOpacity={"1"} unusedIconSelect={""}/>
                    <Main/>
            </sortModalStateContext.Provider>
            </uploadModalStateContext.Provider>              
        </div>
    );
}

export default Home; 
