import { BlockEmbed } from 'quill/blots/block';
// import Link from 'quill/formats/link';
import RdLink from './rdLink';

const ATTRIBUTES = [
    'height',
    'width'
];
const InnerHTML = [
    '<div class="card">',
    '<div class="card-image">',
    '<img src="">',
    '</div>',
    '<div class="card-title">',
    '</div>',
    '</div>'
].join('');

class RdImage extends BlockEmbed {
    static create(value) {
        console.log(value);
        let node = super.create(value);
        console.log(node);
        // node.setAttribute('frameborder', '0');
        // node.setAttribute('allowfullscreen', true);
        // node.setAttribute('class', "card");
        node.innerHTML = InnerHTML;
        var imageNode = node.querySelector("img");
        imageNode.setAttribute("src", this.sanitize(value));
        console.log(node);
        return node;
    }

    static formats(domNode) {
        return ATTRIBUTES.reduce(function(formats, attribute) {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }

    static sanitize(url) {
        console.log(url);
        return RdLink.sanitize(url);
    }

    static value(domNode) {
        return domNode.getAttribute('src');
    }

    format(name, value) {
        console.log(name);
        console.log(value);
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
RdImage.blotName = 'rdImage';
RdImage.className = 'ql-rdImage';
RdImage.tagName = 'p';


export default RdImage;
