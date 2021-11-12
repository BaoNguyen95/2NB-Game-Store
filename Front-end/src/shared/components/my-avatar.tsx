import React from 'react';
import { Typography } from '@material-ui/core';
interface Props {
    data: any;
    variant?: any;
    pixel?: number;
    onClick?: (event: React.MouseEvent<unknown>) => void;
}
const MyAvatar = (props: Props) => {
    const { data, variant, pixel, onClick } = props;
    const handleFunction = () => {
        if (data) {
            const name = data.displayName;
            const _pixel = pixel || 40;
            const firstChar = name.slice(0, 1).toUpperCase();
            const spaceIndex = name.indexOf(' ');
            const secondChar = spaceIndex !== -1 ? name.slice(spaceIndex, spaceIndex + 2).toUpperCase() : name.slice(1, 2).toUpperCase();
            let finalName = firstChar + secondChar;
            finalName = finalName.replace(' ', '');
            if (data.picture) {
                const image = data.picture.data;
                return (
                    <img onClick={onClick} className='userImage' width={`${_pixel}px`} height={`${_pixel}px`} src={image.url} />
                )
            }
            return (
                <div className='userImage' style={{ width: `${_pixel}px`, height: `${_pixel}px` }}>
                    <Typography onClick={onClick} variant={variant} align='center'>{finalName}</Typography>
                </div>
            );
        }
        return (<></>);
    }

    return handleFunction();
}

export default MyAvatar;