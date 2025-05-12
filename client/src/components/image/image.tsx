import { IKImage } from 'imagekitio-react'
import { Props } from './types'

export default function Image(props: Props) {
    return (
        <IKImage
            path={props.media}
            urlEndpoint={import.meta.env.VITE_URL_ENDPOINT_KIT}
            className={props.className}
            transformation={[{ height: props.h, width: props.w }]}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            onClick={props.onClick}
            alt={props.media}
        />
    )
}