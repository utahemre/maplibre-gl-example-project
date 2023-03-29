import { useState } from "react";
import { mapTilerKey } from "./Constants";
import styles from './StyleChanger.module.css';


const StyleChanger = (props) => {

    const [selectedStyle, setSelectedStyle] = useState(1); 
    
    const styleList = [
        {
            id : 1,
            name : "Basic",
            address : "https://api.maptiler.com/maps/basic-v2/style.json?key=" + mapTilerKey,
            icon : "/styleChanger/basic.png",
        },
        {
            id : 2,
            name : "Bright",
            address : "https://api.maptiler.com/maps/bright-v2/style.json?key=" + mapTilerKey,
            icon : "/styleChanger/bright.png",
        },
        ,
        {
            id : 3,
            name : "Satellite",
            address : "https://api.maptiler.com/maps/hybrid/style.json?key=" + mapTilerKey,
            icon : "/styleChanger/satellite.png",
        },
        ,
        {
            id : 4,
            name : "Topo",
            address : "https://api.maptiler.com/maps/topo-v2/style.json?key=" + mapTilerKey,
            icon : "/styleChanger/topo.png",
        }
    ];

    const radioButtonHandler = (event) => {
        setSelectedStyle(event.target.id);
        props.changeStyle(event.target.value);
    }

    return (
        <ul onChange={radioButtonHandler} className={styles.radioUl}>
            {styleList.map(style => {
                return (
                        <div key={style.id} className={styles.radioinputdiv}>
                        <input
                        type="radio"
                        name="styele-changer-radio-image"
                        id={style.id}
                        value={style.address}
                        className={styles.radioinput}
                        defaultChecked = {selectedStyle === style.id}
                        />
                        <img
                            alt={style.name}
                            width={"66px"}
                            height={"40px"}
                            src={style.icon}
                        />
                    </div>
                )
            }) }
        </ul>
    )

}
export default StyleChanger;