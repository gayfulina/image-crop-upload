import React, {useState, useRef} from "react";
import './App.css';
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider"
import Button from "@material-ui/core/Button";

function App() {
    const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);

    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {

    }

    const uploadImageHandler = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                setImage(reader.result);
            })
        }
    }

    return (
        <div className="App">
            <div className="container-cropper">
                <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom}
                         onCropComplete={onCropComplete}/>
                <Slider/>
            </div>
            <div className="container-buttons"></div>
            <input type="file"
                   accept="image/*"
                   ref={inputRef}
                   style={{display: "none"}}
                   onChange={uploadImageHandler}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>Choose</Button>
            <Button variant="contained" color="secondary">Download</Button>
        </div>
    );
}

export default App;
