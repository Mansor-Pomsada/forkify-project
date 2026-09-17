import icons from 'url:../../img/icons.svg';
import View from './View.js';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');


  addHandlerClick(handler) {
    this._parentElement.addEventListener("click",function(e){
      const btn = e.target.closest(".btn--inline");
      if(!btn) return ;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

    _generateMarkupButton (direction){
      
      if (direction === "next") {
      return   `
                <button data-goto=" ${ this._data.page + 1}" class="btn--inline pagination__btn--${direction}">
            <span>Page ${ this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>` ;
      } else if ( direction === "prev") {
              return  `
                <button data-goto=" ${ this._data.page - 1}"  class="btn--inline pagination__btn--${direction}">
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${ this._data.page - 1}</span>
                  </button>`
      }
      
    }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );
    

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton("next");
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton("prev");;
    }

    // Other page
    if (currPage < numPages) {
      
      const next = this._generateMarkupButton("next");
      const prev = this._generateMarkupButton("prev");
      
      return next + prev;
    }
    // Page 1, and there are NO other pages
    return '';
  }

}

export default new paginationView();
