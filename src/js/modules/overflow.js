const overflow = () => {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '100%';
    div.style.height = '50px';

    document.body.appendChild(div);
    const overflowWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return overflowWidth;
};

export default overflow;