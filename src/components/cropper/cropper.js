import React, {useRef, useState} from "react";
import './cropper.css';
import {generateDownload} from "../../utils/cropImage";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

export default function RenderCropper() {
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
        console.log(croppedAreaPercentage, croppedAreaPixels)
        setCroppedArea(croppedAreaPixels);
    }

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                setImage(reader.result);
            })
        }
    }

    const onDownLoad = () => {
        generateDownload(image, croppedArea);
    }

    return (
        <div className="container">
            <div className="container-cropper">
                {
                    image ? <>
                        <div className="cropper">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom} aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}/>
                        </div>
                        <div className="slider">>
                            <Slider
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                    </> : null
                }

            </div>
            <div className="container-buttons">
                <input type="file"
                       accept="image/*"
                       ref={inputRef}
                       style={{display: "none"}}
                       onChange={onSelectFile}
                />

                <Button
                    variant="contained"
                    color="primary"
                    style={{marginRight: "10px"}}
                    onClick={() => setImage(null)}
                >
                    Clear
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    style={{marginRight: "10px"}}
                >
                    Choose
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onDownLoad}
                    style={{marginRight: "10px"}}
                >
                    Download
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                >
                    Upload
                </Button>
            </div>
        </div>
    );
}
