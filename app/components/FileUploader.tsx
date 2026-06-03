import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;



    return (
        <div className="w-full">
            <div {...getRootProps()} className={file ? "cursor-pointer" : "uploader-drag-area"}>
                <input {...getInputProps()} />

                <div>
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button 
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ): (
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
