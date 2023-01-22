import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import axios from "axios";


const Input = styled("input")({
    display: "none",
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


const ImageUpload = () => {
const [image, setImage] = useState(undefined);
return (
    <div>
        <label htmlFor="icon-button-file">
        <Input
                    onChange={async (e) => {
                        const imageFile = e.target.files[0];
                        setImage(imageFile);
                        const base64Image = await toBase64(imageFile);
                        console.log(base64Image);
                        const plantName = await axios.post("http://localhost:8000/sendimage", {base64EncodedImage: base64Image});
                        console.log(plantName);
                        e.target.value = null;
                    }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                />
           
            <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
            >
                <PhotoCamera/>
            </IconButton>
            <p>{image ? image.name : ""}</p>
        </label>
        <div className="p-2">
            <Button  variant="outlined">
                Upload
            </Button>
        </div>
    </div>
);


}



export default ImageUpload;