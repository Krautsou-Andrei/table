import type { SVGProps } from 'react';

import type { IconName } from './types';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
    name: IconName;
}

export function AppIcon({ name, viewBox, ...props }: IconProps) {
    const [spriteName, iconName] = name.split('/');

    return (
        <svg
            aria-hidden
            className="icon"
            focusable="false"
            width={24}
            height={24}
            viewBox={viewBox}
            {...props}
        >
            <use xlinkHref={`/sprite/${spriteName}.svg#${iconName}`} />
        </svg>
    );
}
