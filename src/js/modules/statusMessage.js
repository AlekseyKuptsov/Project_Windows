const statusMessage = (elem, text) => {
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    elem.appendChild(statusMessage);
    document.querySelector('.status').textContent = text;
};

const statusMessageRemove = () => {
    let status = document.querySelectorAll('.status');
    status.forEach(item => item.remove());
};

export { statusMessage, statusMessageRemove };