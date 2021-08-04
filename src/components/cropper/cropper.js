import React, {useRef, useState, useContext} from "react";
import './cropper.css';
import getCroppedImg, {generateDownload} from "../../utils/cropImage";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SnackbarContext} from "../snackbar/snackbar";
import {dataURLtoFile} from "../../utils/dataURLtoFile";

const useStyles = makeStyles({
    iconButton: {
        position: "absolute",
        top: "20px",
        right: "20px"
    },
    cancelIcon: {
        color: "#00a3c8",
        fontSize: "50px",
        "&:hover": {
            color: "red"
        }
    },
})

export default function RenderCropper({handleCropper}) {
    const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const inputRef = useRef(null);
    const classes = useStyles();
    const setStateSnackBarContext = useContext(SnackbarContext);

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
        if (!image)
            return setStateSnackBarContext(
                true,
                'warning',
                'Please select an image',
            );
        generateDownload(image, croppedArea);
    }

    const onClear = () => {
        if (!image)
            return setStateSnackBarContext(
                true,
                'warning',
                'Please select an image',
            );
        setImage(null);
    }

    const onUpload = async () => {
        if (!image)
            return setStateSnackBarContext(
                true,
                'warning',
                'Please select an image',
            );
        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrlToFile = dataURLtoFile(canvasDataUrl, 'cropped-image.jpeg');
        console.log(convertedUrlToFile)
    }

    return (
        <div className="container">
            <IconButton className={classes.iconButton} onClick={handleCropper}>
                <CancelIcon className={classes.cancelIcon}/>
            </IconButton>

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
                    onClick={onClear}
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
                    onClick={onUpload}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
}
