import checkNumInputs from "./checkNumInputs";
import { statusMessage, statusMessageRemove } from "./statusMessage";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Загрузка...",
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data, elem) => {
        statusMessage(elem, message.loading);
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            // let statusMessage = document.createElement('div');
            // statusMessage.classList.add('status');
            // item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData, item)
                .then(res => {
                    console.log(res);
                    statusMessageRemove();
                    statusMessage(item, message.success);
                })
                .catch(() => {
                    statusMessageRemove();
                    statusMessage(item, message.failure);
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessageRemove();
                    }, 3000);
                });
        });
    });
};

export default forms;