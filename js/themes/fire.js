import extend from 'extend';
import Emitter from 'quill/core/emitter';
import BaseTheme, {BaseTooltip} from 'quill/themes/base';
// import LinkBlot from 'quill/formats/link';
import RdLink from '../formats/rdLink';
import {Range} from 'quill/core/selection';
import icons from 'quill/ui/icons';


const TOOLBAR_CONFIG = [
    [{header: ['1', '2', '3', false]}],
    ['bold', 'italic', 'underline', 'link'],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['clean']
];

class FireTheme extends BaseTheme {
    constructor(quill, options) {
        if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
            options.modules.toolbar.container = TOOLBAR_CONFIG;
        }
        super(quill, options);
        this.quill.container.classList.add('ql-snow');
    }

    extendToolbar(toolbar) {
        toolbar.container.classList.add('ql-snow');
        this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons);
        this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons);
        this.tooltip = new FireTooltip(this.quill, this.options.bounds);
        if (toolbar.container.querySelector('.ql-link')) {
            this.quill.keyboard.addBinding({key: 'K', shortKey: true}, function (range, context) {
                toolbar.handlers['link'].call(toolbar, !context.format.link);
            });
        }
    }
}

FireTheme.DEFAULTS = extend(true, {}, BaseTheme.DEFAULTS, {
    modules: {
        toolbar: {
            handlers: {
                link: function (value) {
                    if (value) {
                        let range = this.quill.getSelection();
                        if (range == null || range.length == 0) return;
                        let preview = this.quill.getText(range);
                        if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
                            preview = 'mailto:' + preview;
                        }
                        let tooltip = this.quill.theme.tooltip;
                        tooltip.edit('link', preview);
                    } else {
                        this.quill.format('link', false);
                    }
                }
            }
        }
    }
});


class FireTooltip extends BaseTooltip {
    constructor(quill, bounds) {
        super(quill, bounds);
        this.preview = this.root.querySelector('a.ql-preview');
    }

    listen() {
        super.listen();

        this.root.querySelector('a.ql-remove').addEventListener('click', (event) => {
            if (this.linkRange != null) {
                let range = this.linkRange;
                this.restoreFocus();
                this.quill.formatText(range, 'link', false, Emitter.sources.USER);
                delete this.linkRange;
            }
            event.preventDefault();
            this.hide();
        });
        this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
            console.log("aaaaaa");
            if (range == null) return;
            if (range.length === 0 && source === Emitter.sources.USER) {
                let [link, offset] = this.quill.scroll.descendant(RdLink, range.index - 1);
                offset = offset + 1;
                if (link != null) {
                    this.root.classList.remove("format-image");
                    this.linkRange = new Range(range.index - offset, link.length());
                    let linkFormats = RdLink.formats(link.domNode);

                    this.preview.textContent = linkFormats.href;

                    Object.keys(linkFormats).forEach((key) => {
                        var objValue = linkFormats[key];

                        this.preview.setAttribute(key, objValue);
                    });

                    // this.preview.setAttribute('href', linkFormats);
                    this.show();
                    this.position(this.quill.getBounds(this.linkRange));
                    return;
                }
            } else {
                delete this.linkRange;
            }
            this.hide();
        });
    }

    show() {
        super.show();
        this.root.removeAttribute('data-mode');
    }
}

FireTooltip.TEMPLATE = [
    '<a class="ql-preview" target="_blank" href="about:blank"></a>',
    '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
    '<a class="ql-action"></a>',
    '<a class="ql-remove"></a>'
].join('');


export default FireTheme;
