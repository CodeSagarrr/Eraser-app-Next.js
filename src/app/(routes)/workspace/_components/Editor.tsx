"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import Checklist from '@editorjs/checklist'
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';

export const rawData =
{
    "time": 1550476186479,
    "blocks": [{
        "type": "header",
        "data": {
            "text": "Document name!",
            "level": 3,
        },
        id: "1"
    },
    {
        "type": "header",
        "data": {

            "level": 4,
        },
        id: "2"
    }],
    "version": "2.8.1"
}


function Editor({ trigger, fileId , fileData}:any) {
    const ref = useRef<EditorJS>();
    const [document, setDocument] = useState(rawData);
    const updateDocument = useMutation(api.Files.updateDocument);
    const editorHolder = () => {
        const editor = new EditorJS({

            tools: {
                header: {
                    // @ts-ignore
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header !',
                        levels: [2, 3, 4],
                        defaultLevel: 4
                    }
                },

                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                list: {
                    // @ts-ignore
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                quote: Quote,
            },

            holder: 'editorjs',
            data: fileData?.documents ? JSON.parse(fileData?.documents) : document,
        })
        ref.current = editor;
    }

    const onSaveDocument = () => {
        if (ref.current) {
            ref.current.save().then((outputData) => {
                console.log('Article data: ', outputData)
                updateDocument({
                    _id: fileId,
                    documents: JSON.stringify(outputData),
                }).then((res) =>{
                    toast("Document Saved Successfully")
                }).catch((err) => console.log(err || " error occured"))
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    }

    useEffect(() => {
        trigger && onSaveDocument();
    }, [trigger])

    useEffect(() => {
      fileData &&  editorHolder();
    }, [fileData])
    return (
        <div id='editorjs' className='pl-6 pr-4 py-2'>

        </div>
    )
}

export default Editor
