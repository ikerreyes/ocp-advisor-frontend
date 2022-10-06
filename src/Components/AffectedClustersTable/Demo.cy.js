import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { Intl } from '../../Utilities/intlHelper';
import getStore from '../../Store';
// load the component and the data
import { AffectedClustersTable } from './AffectedClustersTable';
import clusterDetailData from '../../../cypress/fixtures/api/insights-results-aggregator/v2/rule/external.rules.rule|ERROR_KEY/clusters_detail.json';
import rule from '../../../cypress/fixtures/api/insights-results-aggregator/v2/rule/external.rules.rule|ERROR_KEY.json';

let values = _.cloneDeep(clusterDetailData.data['enabled']);
values.forEach(
  (it) => (it['name'] = it['cluster_name'] ? it['cluster_name'] : it['cluster'])
);
// default sorting
const data = _.orderBy(values, ['last_checked_at'], ['desc']);

// describe sections group tests (it)
// and allow to mount component
describe('demo test for the table', () => {
  // before will keep the mount between it-s instead
  // instead of reloading
  beforeEach(() => {
    mount(
      <MemoryRouter>
        <Intl>
          <Provider store={getStore()}>
            <AffectedClustersTable
              query={{
                isError: false,
                isFetching: false,
                isUninitialized: false,
                isSuccess: true,
                data: clusterDetailData.data,
              }}
              rule={rule.content}
            />
          </Provider>
        </Intl>
      </MemoryRouter>
    );
  });

  it('renders table', () => {
    // get is at any level, find within the get
    // should is for the check you want to make
    // commands are chained and executed asynchronously with a wait period
    cy.get('div[id=affected-list-table]')
      .find('table')
      .should('have.length', 1);
  });

  // it('names of rows are links', () => {
  //   cy.get('tbody[role=rowgroup]')
  //     .children() // there are many commands
  //     .each(($el, index) => {
  //       cy.wrap($el) // sometimes you need to wrap items to keep using them with chain commands
  //         .find('td[data-label=Name]')
  //         .find(`a[href*="/clusters/${data[index]['cluster']}"]`)
  //         .should('have.text', data[index]['name']);
  //     });
  // });

  // // describe-s can be nested
  // describe('bulk selector', () => {
  //   it('checkbox can be clicked', () => {
  //     // custom commands can be defined
  //     cy.ouiaId('clusters-selector', 'input').click().should('be.checked');
  //     cy.get('table')
  //       .find('tbody[role=rowgroup]')
  //       .ouiaType('PF4/TableRow')
  //       .each((row) => {
  //         cy.wrap(row).find('td').first().find('input').should('be.checked');
  //       });
  //   });

  //   it('has buttons to select none or all', () => {
  //     cy.ouiaId('clusters-selector').find('button').click();
  //     cy.ouiaId('clusters-selector')
  //       .find('ul li')
  //       .should(($lis) => {
  //         // expect is like should but does not wait
  //         expect($lis).to.have.length(2);
  //         expect($lis.eq(0)).to.contain('0');
  //         expect($lis.eq(1)).to.contain(`${data.length}`);
  //       });
  //   });
  // });

  // // describe-s can be nested
  // describe('modal for cluster disabling', () => {
  //   // and you can add extra stuff there
  //   beforeEach(() => {
  //     cy.intercept(
  //       'PUT',
  //       '/api/insights-results-aggregator/v1/clusters/**/rules/**/error_key/**/disable',
  //       {
  //         statusCode: 200,
  //       }
  //     ).as('disableRequest');
  //     cy.intercept(
  //       'POST',
  //       '/api/insights-results-aggregator/v1/clusters/**/rules/**/error_key/**/disable_feedback',
  //       {
  //         statusCode: 200,
  //       }
  //     ).as('disableFeedbackRequest');
  //   });

  //   it('modal for cluster disabling', () => {
  //     cy.get('table')
  //       .find('tbody[role=rowgroup]')
  //       .ouiaType('PF4/TableRow')
  //       .first()
  //       .find('td')
  //       .eq(5)
  //       .click()
  //       .contains('Disable')
  //       .click();

  //     cy.ouiaType('PF4/ModalContent')
  //       .find('.pf-c-check label')
  //       .should('have.text', 'Disable only for this cluster');

  //     cy.ouiaType('PF4/ModalContent')
  //       .ouiaType('PF4/Checkbox')
  //       .should('be.checked');

  //     cy.ouiaType('PF4/ModalContent')
  //       .find('button[data-ouia-component-id="confirm"]')
  //       .click();
  //     // Should catch at one PUT and at one POST requests after clusters rule disable
  //     cy.wait('@disableRequest');
  //     cy.wait('@disableFeedbackRequest');
  //   });
  // });
});
