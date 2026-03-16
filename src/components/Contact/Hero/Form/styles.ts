// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap, getRadius, Label } from '@tackl';
import { bodyM, captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$area?: 'name' | 'email' | 'message';
	$variant?: 'success' | 'error';
}

// Exports
// ------------
export const Jacket = styled.form<StylesInterface>(
	() => css`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${getGap('sm')};
        padding: ${getGap('l')} var(--mobile-extra-pad) 0;

        ${bp.l`
            gap: ${getGap('l')};
            padding: ${getGap('xxl')} ${getGap('uber')} 0;
        `}
    `
);

const sharedInputStyles = css`
	background: ${getGlobal('black', 5)};
    border: 1px solid ${getGlobal('black', 10)};
    color: ${getGlobal('black')};
`;

export const Radios = styled(Div)(
	() => css`
		display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
		gap: ${getGap('sm')};

        /* Reset */
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        background: none;

        ${bp.l`
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: ${getGap('l')};
        `}
        

        h3 {
            ${bodyM}

            display: inline-block;
            flex: 1;

            color: ${getGlobal('black')};
        }

        fieldset {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: ${getGap('sm')} ${getGap('m')};
            width: 100%;
            

            /* Reset */
            outline: none;
            border: none;
            padding: 0;
            margin: 0;
            background: none;

            ${bp.l`
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: ${getGap('l')};
                width: auto;
            `}
        }
	`
);

export const Radio = styled(Label)(
	() => css`
        grid-column: span 1;

		display: flex;
		align-items: center;
		gap: ${getGap('s')};

        
        cursor: pointer;
        user-select: none;


        @media (hover: hover) and (pointer: fine) {
            &:hover {
                span {
                    color: ${getBrand('bc1')};
                }

                input {
                    border-color: transparent;
                    background: ${getGlobal('black', 2)};
                }
            }
        }

        span {
            ${bodyM}
            color: ${getGlobal('black', 60)};
            transition: color 0.5s ${getEase('bezzy2')};
        }

        input {
            --size: 2.4rem;

            ${sharedInputStyles}

            width: var(--size);
            height: var(--size);
            border-radius: 50%;

            appearance: none;
            outline: none;
            position: relative;
            
            transition: border-color 0.5s ${getEase('bezzy2')}, background 0.5s ${getEase('bezzy2')};
        
            &:before, &:after {
                content: '';
                display: block;
                position: absolute;
                top: 50%; left: 50%;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.5s ${getEase('bezzy2')};
            }

            &::before {
                background: ${getBrand('bc1')};
            }

            &:after {
                background: ${getGlobal('luxuryWhite')};
                transition-delay: 0.1s;
            }

            &:checked {
                border-color: transparent;

                &:before {
                    transform: translate(-50%, -50%) scale(1);
                }

                &:after {
                    transform: translate(-50%, -50%) scale(0.5);
                }

                + span {
                    color: ${getGlobal('black')};
                }
            }
        }

        
	`
);

export const Inputs = styled(Div)(
	() => css`
        flex: 1;
		display: grid;
        grid-template-areas: 
        "name email"
        "message message";
        grid-template-rows: auto 1fr;
        gap: ${getGap('sm')};
        width: 100%;

        ${bp.l`
            gap: ${getGap('l')};
        `}
	`
);

export const Input = styled.input<StylesInterface>(
	({ $area }) => css`
        ${sharedInputStyles}
        ${bodyM}
        text-box: none;

        grid-area: ${$area};
		display: block;

		width: 100%;
        height: 4rem;
        padding-inline: ${getGap('sm')};
        border-radius: ${getRadius('s')};

        ${bp.l`
            height: 5.6rem;
            padding-inline: ${getGap('m')};
        `}

        &::placeholder {
            ${bodyM}
            color: ${getGlobal('black', 50)};
            opacity: 1;
        }
	`
);

export const TextArea = styled.textarea<StylesInterface>(
	({ $area }) => css`
        ${sharedInputStyles}
        ${bodyM}

        grid-area: ${$area};
        min-height: 0;
        height: 100%;

		display: block;
		width: 100%;
        padding: ${getGap('sm')};

        border-radius: ${getRadius('s')};
        resize: none;

        ${bp.l`
            padding: ${getGap('m')};
        `}

        &::placeholder {
            ${bodyM}
            color: ${getGlobal('black', 50)};
            opacity: 1;
        }
	`
);

export const Status = styled(Div)<StylesInterface>(
	({ $variant }) => css`
		${captionL}

        display: grid;
        place-items: center;

        padding-inline: ${getGap('sm')};
        height: 4.8rem;
        background: ${$variant === 'success' ? getBrand('bc4', 20) : getBrand('bc1', 10)};
		color: ${$variant === 'success' ? getBrand('bc3') : getBrand('bc1')};

        border-radius: ${getRadius('s')};
        text-align: center;

        user-select: none;
        pointer-events: none;
	`
);

export const StatusButtonContainer = styled(Div)(
	() => css`
		display: flex;
        flex-direction: column;
		gap: ${getGap('xs')};
        width: 100%;
	`
);
