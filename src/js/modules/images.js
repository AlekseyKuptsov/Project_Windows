import overflow from "./overflow";

const images = function() {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img'),
          scroll = overflow();

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);
    imgPopup.appendChild(bigImage);
    imgPopup.style.cssText = 'display:none;';

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;
        
        if (target && target.classList.contains('preview')) {
            imgPopup.style.cssText = 'justify-content:center; align-items:center; display:flex; max-width:100%; max-height:100%';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div')) {
            imgPopup.style.cssText = 'display:none;';
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        }
    });
};

export default images;