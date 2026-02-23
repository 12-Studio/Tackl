// Imports
// -----------------
import type { Theme } from '@theme/interface';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';
import styled from 'styled-components';
import { breakpointDown, breakpointUp } from './breakpoints';
import { gridSemantics, semantics } from './semantics';
import type { SemanticProps } from './semantics/interface';

// SECTION • Semantic Components Generator
// ------------
const createSemanticComponent = (tag: string) => styled(tag)<SemanticProps>`
	${props => semantics(props)}
	${props => gridSemantics(props)}
`;

// SECTION • Semantic Components
// ------------
export const Waffl = createSemanticComponent('waffl-grid');
export const Section = createSemanticComponent('section');
export const Div = createSemanticComponent('div');
export const Main = createSemanticComponent('main');
export const Nav = createSemanticComponent('nav');
export const Form = createSemanticComponent('form');
export const Article = createSemanticComponent('article');
export const Aside = createSemanticComponent('aside');
export const Header = createSemanticComponent('header');
export const Footer = createSemanticComponent('footer');
export const Address = createSemanticComponent('address');
export const List = createSemanticComponent('ul');
export const OrderedList = createSemanticComponent('ol');
export const ListItem = createSemanticComponent('li');
export const Dl = createSemanticComponent('dl');
export const Dt = createSemanticComponent('dt');
export const Dd = createSemanticComponent('dd');
export const Figure = createSemanticComponent('figure');
export const FigCaption = createSemanticComponent('figcaption');
export const Mark = createSemanticComponent('mark');
export const Time = createSemanticComponent('time');
export const Output = createSemanticComponent('output');
export const Details = createSemanticComponent('details');
export const Summary = createSemanticComponent('summary');
export const Dialog = createSemanticComponent('dialog');
export const Progress = createSemanticComponent('progress');
export const Meter = createSemanticComponent('meter');
export const H1 = createSemanticComponent('h1');
export const H2 = createSemanticComponent('h2');
export const H3 = createSemanticComponent('h3');
export const H4 = createSemanticComponent('h4');
export const H5 = createSemanticComponent('h5');
export const H6 = createSemanticComponent('h6');
export const P = createSemanticComponent('p');
export const Pre = createSemanticComponent('pre');
export const Code = createSemanticComponent('code');
export const Em = createSemanticComponent('em');
export const Strong = createSemanticComponent('strong');
export const Small = createSemanticComponent('small');
export const Span = createSemanticComponent('span');
export const Quote = createSemanticComponent('q');
export const Blockquote = createSemanticComponent('blockquote');
export const Cite = createSemanticComponent('cite');
export const Abbr = createSemanticComponent('abbr');
export const Ins = createSemanticComponent('ins');
export const Del = createSemanticComponent('del');
export const Sup = createSemanticComponent('sup');
export const Sub = createSemanticComponent('sub');
export const Br = createSemanticComponent('br');
export const Hr = createSemanticComponent('hr');
export const B = createSemanticComponent('b');
export const I = createSemanticComponent('i');
export const U = createSemanticComponent('u');
export const S = createSemanticComponent('s');
export const A = createSemanticComponent('a');
export const Img = createSemanticComponent('img');
export const Table = createSemanticComponent('table');
export const Caption = createSemanticComponent('caption');
export const Thead = createSemanticComponent('thead');
export const Tbody = createSemanticComponent('tbody');
export const Tfoot = createSemanticComponent('tfoot');
export const Tr = createSemanticComponent('tr');
export const Th = createSemanticComponent('th');
export const Td = createSemanticComponent('td');
export const Colgroup = createSemanticComponent('colgroup');
export const Col = createSemanticComponent('col');
export const Fieldset = createSemanticComponent('fieldset');
export const Legend = createSemanticComponent('legend');
export const Label = createSemanticComponent('label');
export const Input = createSemanticComponent('input');
export const Button = createSemanticComponent('button');
export const Select = createSemanticComponent('select');
export const Datalist = createSemanticComponent('datalist');
export const Optgroup = createSemanticComponent('optgroup');
export const Option = createSemanticComponent('option');
export const Textarea = createSemanticComponent('textarea');
export const Canvas = createSemanticComponent('canvas');
export const Svg = createSemanticComponent('svg');
export const Audio = createSemanticComponent('audio');
export const Video = createSemanticComponent('video');
export const Source = createSemanticComponent('source');
export const Track = createSemanticComponent('track');
export const Map = createSemanticComponent('map');
export const Area = createSemanticComponent('area');
export const Picture = createSemanticComponent('picture');
export const SummaryEl = createSemanticComponent('summary');
export const Menu = createSemanticComponent('menu');

// SECTION • Breakpoints
// ------------
export const bp = breakpointUp;
export const bpd = breakpointDown;

// SECTION • Theme Getters
// ------------
export const getGlobal = (color: keyof Theme['colors']['global'], opacity?: number) => (props: { theme: Theme }) => {
	const global = props.theme.colors.global;
	return global?.[color]?.[opacity !== undefined ? opacity : 100];
};

export const getBrand = (color: keyof Theme['colors']['brand'], opacity?: number) => (props: { theme: Theme }) => {
	const brand = props.theme.colors?.brand;
	return brand?.[color]?.[opacity !== undefined ? opacity : 'solid'];
};

export const getFeedback =
	(color: 'positive' | 'negative' | 'warning', opacity?: number) => (props: { theme: Theme }) => {
		const feedback = props.theme.colors.feedback[color];
		return feedback?.[opacity !== undefined ? opacity : 'solid'];
	};

export const getGap = (gapSize: keyof Theme['gap']) => (props: { theme: Theme }) => {
	return props.theme.gap[gapSize];
};

export const getSpace = (spaceSize: keyof Theme['space']) => (props: { theme: Theme }) => {
	return props.theme.space[spaceSize];
};

export const getFont = (fontFamily: keyof Theme['font']['family']) => (props: { theme: Theme }) => {
	return props.theme.font.family[fontFamily];
};

export const getFontWeight = (fontWeight: keyof Theme['font']['weight']) => (props: { theme: Theme }) => {
	return props.theme.font.weight[fontWeight];
};

export const getRadius = (radiusSize: keyof Theme['br']) => (props: { theme: Theme }) => {
	return props.theme.br[radiusSize];
};

export const getEase = (easeSize: keyof Theme['easing']) => (props: { theme: Theme }) => {
	return props.theme.easing[easeSize];
};

export const getUtil = (util: keyof Theme['utils']) => (props: { theme: Theme }) => {
	return props.theme.utils[util];
};

// SECTION • Viewport Utilities
// ------------
export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;
