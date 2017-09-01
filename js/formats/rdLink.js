import Inline from 'quill/blots/inline';


const ATTRIBUTES = [
    'target',
    "href"
];

class Link extends Inline {
    static create(value) {
        let node = super.create(value);

        if (typeof  value === "object") {

            Object.keys(value).forEach((key) => {
                var objValue = value[key];
                if (key === "href") {
                    objValue = this.sanitize(objValue);
                }
                node.setAttribute(key, objValue);
            });
        } else if (typeof  value === "string") {
            value = this.sanitize(value);
            node.setAttribute('href', value);
            node.setAttribute('target', '_blank');
        }

        return node;
    }

    static formats(domNode) {

        return ATTRIBUTES.reduce(function(formats, attribute) {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});

        // return domNode.getAttribute('href');
    }

    static sanitize(url) {
        return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    }

    format(name, value) {
        console.log("rdLink, without href attributes");

        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }

        if (name !== this.statics.blotName || !value) return super.format(name, value);
        value = this.constructor.sanitize(value);
        this.domNode.setAttribute('href', value);
    }
}

Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];


function sanitize(url, protocols) {
    let anchor = document.createElement('a');
    anchor.href = url;
    let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
    return protocols.indexOf(protocol) > -1;
}


export {Link as default, sanitize};
