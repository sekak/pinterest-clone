import { IKImage } from 'imagekitio-react'
import React from 'react'
import { Props } from './types'

export default function Image(props: Props) {
    return (
        <IKImage
            path={props.media}
            src={props.src}
            urlEndpoint={import.meta.env.VITE_URL_ENDPOINT}
            className={props.className}
            transformation={[{ height: props.h, width: props.w}]}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
        />
    )
}
