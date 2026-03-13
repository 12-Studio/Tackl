// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getGap, getRadius, ListItem } from '@tackl';
import { titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
position: relative;        
        width: 100%;
        height: 75svh;

        padding-inline: ${getGap('m')};
        background: linear-gradient(to bottom, ${getBrand('bc3')} 0%, ${getBrand('bc4')} 100%);

        ${bp.l`
        position: relative;
            flex: 0 0 85rem;
            width: 85rem;
            height: 100%;
            background: transparent;
        `}

        ${bp.xl`
            flex: 0 0 95rem;
            width: 95rem;
        `}

        .frame.bottom {
            position: absolute;
            z-index: 2;
            bottom: var(--mobile-pad);
            left: 0;
            background: ${getGlobal('luxuryWhite', 20)};

            ${bp.l`
                bottom: ${getGap('sm')};
            `}
        }
    `
);

export const Picture = styled(Div)<StylesInterface>(
	() => css`
        position: absolute;
        inset: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center bottom;
        }
    `
);

export const Details = styled(Div)<StylesInterface>(
	() => css`
        --offset: ${getGap('l')};

        position: absolute;
        inset: var(--offset);
        z-index: 2;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: ${getGap('m')};

        

        ${bp.l`
            --offset: ${getGap('huge')};
            
            inset: auto var(--offset) var(--offset) var(--offset);

            background: ${getGlobal('black', 60)};
            backdrop-filter: blur(1.6rem);
            padding: ${getGap('sm')};
            border-radius: ${getRadius('s')};

            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 0;

            padding: ${getGap('l')};
        `}
	`
);

export const Left = styled(Div)<StylesInterface>(
	() => css`

        display: flex;
        flex-direction: column;
        gap: ${getGap('s')};
        text-align: center;

        ${bp.l`
            text-align: left;
            gap: ${getGap('m')};
        `}
        

        h3 {
            ${titleL}
            color: ${getGlobal('luxuryWhite')};
        }

        h4 {
            ${titleL}
            color: ${getGlobal('luxuryWhite', 60)};
        }
	`
);

export const Right = styled(Div)<StylesInterface>(
	() => css`
        
        display: flex;
        align-items: center;
        gap: ${getGap('sm')};

        ${bp.l`
            gap: ${getGap('m')};
        `}
	`
);
