import overflow from "./overflow";
import { statusMessage, statusMessageRemove } from "./statusMessage";

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              windowWidth = document.querySelector('#width'),
              windowHeight = document.querySelector('#height'),
              windowProfile = [...document.querySelectorAll('.checkbox')],
              scroll = overflow();

        const message = {
            size: "Укажите размеры",
            profile: "Выберите профиль"
        };

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                statusMessageRemove();
                if (e.target) {
                    e.preventDefault();
                }

                if (modal.classList.contains('popup_calc_profile')) {
                    if (!windowWidth.value || !windowHeight.value) {
                        statusMessage(item.parentElement, message.size);
                        return;
                    }
                }

                if (modal.classList.contains('popup_calc_end')) {
                    if (windowProfile.every(item => !item.checked)) {
                        statusMessage(item.parentElement, message.profile);
                        return;
                    }
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '';
                // document.body.classList.remove('modal-open');
            }
        });


    }

        function showModalByTime(selector, time) {
            setTimeout(function () {
                let display;
                document.querySelectorAll('[data-modal]').forEach(item => {
                    if (getComputedStyle(item).display != 'none') {
                        display = true;
                    }
                });

                if (!display) {
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                }
            }, time);
        }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup_engineer', 60000);
};

export default modals;