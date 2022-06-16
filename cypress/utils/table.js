import _ from 'lodash';

import { ROW, TBODY, TABLE, TITLE } from './components';

function checkTableHeaders(expectedHeaders) {
  /* patternfly/react-table-4.71.16, for some reason, renders extra empty `th` container;
       thus, it is necessary to look at the additional `scope` attr to distinguish between visible columns
    */
  return cy
    .get('table th[scope="col"]')
    .then(($els) => {
      return _.map(Cypress.$.makeArray($els), 'innerText');
    })
    .should('deep.equal', expectedHeaders);
}

// TODO function to get all rows

// TODO fucntion to get rowgroup

function checkRowCounts(n, isSelectableTable = false) {
  return isSelectableTable
    ? cy.get('table').find(TBODY).should('have.length', n)
    : cy.get('table').find(TBODY).find(ROW).should('have.length', n);
}

function columnName2UrlParam(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

function tableIsSortedBy(columnTitle) {
  return cy
    .get('table')
    .find(`th[data-label="${columnTitle}"]`)
    .should('have.class', 'pf-c-table__sort pf-m-selected');
}

function checkEmptyState(title, checkIcon = false) {
  checkRowCounts(1);
  cy.get(TABLE)
    .ouiaId('empty-state')
    .should('have.length', 1)
    .within(() => {
      cy.get('.pf-c-empty-state__icon').should(
        'have.length',
        checkIcon ? 1 : 0
      );
      cy.get(`h5${TITLE}`).should('have.text', title);
    });
}

function checkNoMatchingClusters() {
  return checkEmptyState('No matching clusters found');
}

function checkNoMatchingRecs() {
  return checkEmptyState('No matching recommendations found');
}

export {
  checkTableHeaders,
  checkRowCounts,
  columnName2UrlParam,
  tableIsSortedBy,
  checkEmptyState,
  checkNoMatchingClusters,
  checkNoMatchingRecs,
};
