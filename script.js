let scroll = document.querySelector('.scroll');

function isTrackPad(e) {
    return e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0
}

scroll.addEventListener('wheel', event => {
    if (!isTrackPad(event)) {
        event.preventDefault()
    };

    if (event.deltaY > 0) {
        event.currentTarget.scrollLeft += event.currentTarget.clientWidth / 2;
    } else {
        event.currentTarget.scrollLeft -= event.currentTarget.clientWidth / 2;
    }
});