const checkNumInputs = function(selector) {
    const numInput = document.querySelectorAll(selector);

    numInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;