import React from 'react';
import loader from '../../images/ICON/preloader.gif'

const Preloader = (props) => {
    return (
        <div className="text-center py-5 my-5 col-12" style={{display: props.visibility}}>
            <img src={loader} alt="" />
        </div>
    );
};

export default Preloader;