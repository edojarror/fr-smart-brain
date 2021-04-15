import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3" style={{textAlign: "center"}}>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="centering">
                <div className="form centering pa4 br3 shadow-5">
                    <input 
                        className="f4 pa2 w-70 center" 
                        type="text"
                        onChange={onInputChange}>                  
                    </input>
                    <button 
                        className="w-30 grow f4 link ph3 pv2 white bg-light-purple"
                        onClick={onPictureSubmit}
                    >
                        Detect
                    </button>
                </div>   
            </div>
            
        </div>
    )
}

export default ImageLinkForm;