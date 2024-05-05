import { forwardRef, useState } from 'react';
import images from '~/assets/img';

const Image = forwardRef(
    ({ src, alt, fallBack: customFallback = images.noImage, ...pros }, ref) => {
        const [fallBack, setFallBack] = useState('');
        const handleImageError = () => {
            setFallBack(customFallback);
        };
        return (
            <img
                ref={ref}
                src={fallBack || src}
                alt={alt}
                {...pros}
                onError={handleImageError}
            />
        );
    },
);

export default Image;
