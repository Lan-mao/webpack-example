import clipboard from 'quill/modules/clipboard';


class RdClipboard extends clipboard {
    onPaste(e) {

        // var wrapper = document.querySelector('#editor-wrapper');
        var doc = document.documentElement;
        var scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        // var scrollTop = wrapper.scrollTop;
        super.onPaste(e);
        setTimeout(function () {
            window.scrollTo(scrollLeft, scrollTop);
            // wrapper.scrollTop = scrollTop;
        }, 10);
    }
}

export default RdClipboard;
