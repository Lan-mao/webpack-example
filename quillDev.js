import Quill from 'quill/core';

import {AlignClass, AlignStyle} from 'quill/formats/align';
import {DirectionAttribute, DirectionClass, DirectionStyle} from 'quill/formats/direction';
import {IndentClass as Indent} from 'quill/formats/indent';

import Blockquote from 'quill/formats/blockquote';
import Header from 'quill/formats/header';
import List, {ListItem} from 'quill/formats/list';

import {BackgroundClass, BackgroundStyle} from 'quill/formats/background';
import {ColorClass, ColorStyle} from 'quill/formats/color';
import {FontClass, FontStyle} from 'quill/formats/font';
import {SizeClass, SizeStyle} from 'quill/formats/size';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import RdLink from './js/formats/rdLink';
import Script from 'quill/formats/script';
import Strike from 'quill/formats/strike';
import Underline from 'quill/formats/underline';

import Image from 'quill/formats/image';
import Video from 'quill/formats/video';
// import RdImage from './js/formats/rdImage';

import CodeBlock, {Code as InlineCode} from 'quill/formats/code';

import Formula from 'quill/modules/formula';
import Syntax from 'quill/modules/syntax';
import Toolbar from 'quill/modules/toolbar';

import Icons from 'quill/ui/icons';
import Picker from 'quill/ui/picker';
import ColorPicker from 'quill/ui/color-picker';
import IconPicker from 'quill/ui/icon-picker';
import Tooltip from 'quill/ui/tooltip';


import {RdFirstLineIndentClass as RdFirstLineIndent} from './js/formats/rdFirstLineIndent';

// import BubbleTheme from 'quill/themes/bubble';
import SnowTheme from 'quill/themes/snow';
import FireTheme from "./js/themes/fire"


Quill.register({
    'attributors/attribute/direction': DirectionAttribute,

    'attributors/class/align': AlignClass,
    'attributors/class/background': BackgroundClass,
    'attributors/class/color': ColorClass,
    'attributors/class/direction': DirectionClass,
    'attributors/class/font': FontClass,
    'attributors/class/size': SizeClass,

    'attributors/style/align': AlignStyle,
    'attributors/style/background': BackgroundStyle,
    'attributors/style/color': ColorStyle,
    'attributors/style/direction': DirectionStyle,
    'attributors/style/font': FontStyle,
    'attributors/style/size': SizeStyle
}, true);


Quill.register({
    'formats/align': AlignClass,
    'formats/direction': DirectionClass,
    'formats/indent': Indent,

    'formats/rdFirstLineIndent': RdFirstLineIndent,

    'formats/background': BackgroundStyle,
    'formats/color': ColorStyle,
    'formats/font': FontClass,
    'formats/size': SizeClass,

    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/header': Header,
    'formats/list': List,

    'formats/bold': Bold,
    'formats/code': InlineCode,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/rdLink': RdLink,

    'formats/script': Script,
    'formats/strike': Strike,
    'formats/underline': Underline,

    'formats/image': Image,
    'formats/video': Video,
    // 'formats/rdImage': RdImage,

    'formats/list/item': ListItem,

    'modules/formula': Formula,
    'modules/syntax': Syntax,
    'modules/toolbar': Toolbar,

    // 'themes/bubble': BubbleTheme,
    'themes/snow': SnowTheme,
    'themes/fire': FireTheme,

    'ui/icons': Icons,
    'ui/picker': Picker,
    'ui/icon-picker': IconPicker,
    'ui/color-picker': ColorPicker,
    'ui/tooltip': Tooltip
}, true);


module.exports = Quill;
