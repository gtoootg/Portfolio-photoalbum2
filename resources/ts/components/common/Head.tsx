import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import styles from '../../../styles/head.module.scss';

import {uploadModalStateContext, sortModalStateContext} from '../home/Home';

interface HeadProps{
    unusedIconOpacity?:string;
    unusedIconSelect?:any;
}

const Head: React.FC<HeadProps> = (props)=> {
  
    const {unusedIconOpacity,unusedIconSelect} = props

    // const{display} =props;
    const{uploadModalState, setUploadModalState} = useContext(uploadModalStateContext);
    const{sortModalState, setSortModalState} = useContext(sortModalStateContext);

    //Handler//////////////
    const setUploadModalStateHandler = (e: React.MouseEvent<HTMLElement>) => {
        setUploadModalState(!uploadModalState);
    }
    const setSortModalStateHandler = (e: React.MouseEvent<HTMLElement>) => {
        setSortModalState(!sortModalState);
    }
    ///////////////////////

    interface MenuIconProps{
        name: string;
        link?:string;
        fileName: string;
        unusedIconOpacity?: string;
        unusedIconSelect?:any
        onClick?:(e: React.MouseEvent<HTMLElement>) => void;
    }

    const MenuIcon: React.FC<MenuIconProps> = (props)=>{

        const {name, link, fileName, unusedIconOpacity, unusedIconSelect, onClick} = props

        const path = () => `./icon/${fileName}`

        return(
            <Link
            　　to ={link? `${link}`:""}
                className={styles.header__menu__menuIcon}
                onClick = {onClick}
                style={{
                    "opacity":unusedIconOpacity,
                    "pointerEvents":unusedIconSelect
                }}
            >
                <img className={styles.header__menu__menuIcon__image} src={path()} />
            </Link>
        )
    }

    return(
        <div 
            className="header" 
            // style={{"pointerEvents": uploadModalState? "none":"auto"}}
        >
            <div className="container">
            <div className={styles.header}>
                <Link
                    to={"/"}
                    className={styles.header__logo}
                >
                    <h3>GoTo Travels </h3>
                </Link>
                <div className={styles.header__menu}>
                    <MenuIcon name={"Home"} link={"/"} fileName={"home.jpg"}/>   
                    <MenuIcon name={"Upload"} fileName={"upload.jpg"} unusedIconOpacity={unusedIconOpacity}  unusedIconSelect={unusedIconSelect} onClick={setUploadModalStateHandler}/>
                    <MenuIcon name={"Sort"} fileName={"sort.png"} unusedIconOpacity={unusedIconOpacity} unusedIconSelect={unusedIconSelect} onClick={setSortModalStateHandler}/>    
                    <MenuIcon name={"Map"} fileName={"map.png"} unusedIconOpacity={unusedIconOpacity} />         
                </div>
            </div>
            </div>
            <div style={{"borderBottom": "solid 0.5px gray"}}></div>
        </div>
    )
    
}

export default Head; 
