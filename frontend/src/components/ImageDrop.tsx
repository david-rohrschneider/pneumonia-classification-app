import { useDropzone } from 'react-dropzone'
import React, { useMemo } from 'react'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5rem',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(250,250,250,0.1)',
    outline: 'none',
    transition: 'border .1s ease-out',
}

const focusedStyle = {
    backgroundColor: 'rgba(250,250,250,0.2)',
}

const acceptStyle = {
    backgroundColor: 'rgba(250,250,250,0)',
}

const rejectStyle = {
    borderColor: '#ff1744',
    backgroundColor: 'rgba(250,250,250,0)',
}

interface ImageDropProps {
    processImage: (image: File) => void
}

function ImageDrop({ processImage }: ImageDropProps) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDropAccepted: (image: File[]) => processImage(image[0]),
    })

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    )

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <span className={'text-xl font-bold'}>
                    Drop an image here, or click to select one
                </span>
            </div>
        </div>
    )
}

export default ImageDrop
