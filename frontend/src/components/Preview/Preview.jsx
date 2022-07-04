import { useEffect, useState } from "react"
import "./preview.css"
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const Input = styled('input')({
    display: 'none',
  });



const PreviewImg = ( props) => {
    const [selectedImage, setSelectedImage] = useState()

    useEffect(()=>{props.ImageCallback(selectedImage)},[props])

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage()
    }

    return (
        <>
            <div className="previewImgConainer">

                <div style={styles.container}>
                    <label htmlFor="icon-button-file" style={styles.inputLabel} >
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={imageChange} />
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                            <PhotoCamera /> <h6>Upload Session Banner</h6>
                        </IconButton>
                    </label>
                    {selectedImage && (
                        <div style={styles.preview}>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                style={styles.image}
                                alt="Thumb"
                            />
                            <button onClick={removeSelectedImage} style={styles.delete}>
                                Remove This Image
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default PreviewImg

// Just some styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 5,
    },
    inputLabel:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    preview: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        // border: "1px solid grey",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
}