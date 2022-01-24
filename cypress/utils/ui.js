const FILTERS_DROPDOWN = 'ul[class=pf-c-dropdown__menu]';
const FILTER_TOGGLE = 'span[class=pf-c-select__toggle-arrow]';

/**
 *
 * @param {*} filters array with objects as:
 *  {
 *      selectorText: string
 *      type: input | checkbox | radio
 *      value: string (for input/radio) | array (for checkbox)
 *  }
 */

/**
 *
 * @param {*} filters value to set on the filters
 * {key: string (for input/radio) | array (for checkbox)}
 * @param {*} filtersConf global configuration of the filter settings
 *  {
 *      selectorText: string
 *      type: input | checkbox | radio
 *  }
 */
function applyFilters(filters, filtersConf) {
  for (const [key, value] of Object.entries(filters)) {
    const item = filtersConf[key];
    // open filter selector
    cy.get('div.ins-c-primary-toolbar__filter')
      .find('button[class=pf-c-dropdown__toggle]')
      .click({ force: true });

    // select appropriate filter
    cy.get(FILTERS_DROPDOWN).contains(item.selectorText).click({ force: true });

    // fill appropriate filter
    if (item.type === 'input') {
      cy.get('input.ins-c-conditional-filter').type(value);
    } else if (item.type === 'checkbox') {
      cy.get(FILTER_TOGGLE).click({ force: true });
      value.forEach((it) => {
        cy.get('ul[class=pf-c-select__menu]')
          .find('label')
          .contains(it)
          .parent()
          .find('input[type=checkbox]')
          .check({ force: true });
      });
    } else {
      throw `${it.type} not recognized`;
    }
  }
}

export { applyFilters };