
import galleryItems from './app.js'

const refs = {
    list:document.querySelector('.gallery'),
    modal:document.querySelector('.lightbox'),
    lightboxImage:document.querySelector('.lightbox__image'),
    };
    
    const {list,modal,lightboxImage} = refs;

    list.addEventListener('click',openImage);
    
    const listItemsMarkup = createListItemMarkup(galleryItems);
    insertListItems(listItemsMarkup);
    
    function createListItemMarkup(array){
      return array.map((elem)=>{
      const {preview, original, description} = elem;
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`;
    }).join('')
    } 
    
    function insertListItems(items){
      list.insertAdjacentHTML("beforeend",items)
    }
        
    
    let currentImage;
    
    function openImage(e){
    e.preventDefault()
    showElement(modal)
    currentImage = e.target.parentNode.parentNode;
    lightboxImage.setAttribute("src",e.target.dataset.source); 
    modal.addEventListener('click',closeModal);
    window.addEventListener('keydown', keyDown);
    }
      
      function closeModalByKey(e){
        hideElement(modal);
        lightboxImage.setAttribute("src",""); 
        removeListener();
      }
    
      function closeModal(e){
        if(e.target.classList.contains('lightbox__overlay') || e.target.dataset.action === 'close-lightbox') 
        hideElement(modal);
        lightboxImage.setAttribute("src",""); 
        removeListener();
      }
    
      function showElement(element){
        element.classList.add('is-open');
        // element.classList.toggle('is-open');
      }
    
      function hideElement(element){
        element.classList.remove('is-open');
        // element.classList.toggle('is-open');
      }
    
      function moveRight(e){
        if(currentImage.nextSibling===null) return;
        currentImage = currentImage.nextSibling;
        lightboxImage.setAttribute("src",currentImage.firstElementChild.children[0].dataset.source); 
      }
    
      function moveLeft(e){
        {
          if(currentImage.previousSibling===null) return;
           currentImage = currentImage.previousSibling;
        lightboxImage.setAttribute("src",currentImage.firstElementChild.children[0].dataset.source); }
      }
    
      function keyDown(e){
        if(e.code === 'Escape') closeModalByKey(e);
        if(e.code === 'ArrowRight') moveRight(e);
        if(e.code === 'ArrowLeft') moveLeft(e);
      }
    
      function removeListener(){
        window.removeEventListener('keydown', keyDown);
        modal.removeEventListener('click',closeModal);
      }
    
    
      // function closeModalbyClick(e){
    // if(e.target.classList.contains('lightbox__overlay')) 
    // modal.classList.remove('is-open');
    // // modal.classList.toggle('is-open');
    // lightboxImage.setAttribute("src",""); 
    // }
    
    // function closeModalByButton(e){
    //   if(e.target.dataset.action === 'close-lightbox');
    //   modal.classList.remove('is-open');
    //   // modal.classList.toggle('is-open');
    //   lightboxImage.setAttribute("src",""); 
    //   }