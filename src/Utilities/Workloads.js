import _, { isEmpty } from 'lodash';

export const SEVERITY_OPTIONS = [
  {
    value: 'critical',
    label: 'Critical',
    iconColor: 'var(--pf-global--danger-color--100)',
    textColor: 'var(--pf-global--danger-color--100)',
    hasIcon: true,
  },
  {
    value: 'important',
    label: 'Important',
    iconColor: 'var(--pf-global--palette--orange-300)',
    textColor: 'var(--pf-global--palette--orange-400)',
    hasIcon: true,
  },
  {
    value: 'moderate',
    label: 'Moderate',
    iconColor: 'var(--pf-global--warning-color--100)',
    textColor: 'var(--pf-global--warning-color--200)',
    hasIcon: true,
  },
  {
    value: 'low',
    label: 'Low',
    iconColor: 'var(--pf-global--Color--200)',
    textColor: 'var(--pf-global--default-color--300)',
    hasIcon: true,
  },
  {
    value: 'none',
    label: 'Unknown',
  },
];

export const remappingSeverity = (obj, mode) => {
  const mapping = {
    1: 'low',
    2: 'moderate',
    3: 'important',
    4: 'critical',
  };
  let updatedObj = {};

  if (mode === 'general' || mode === 'label') {
    for (const key in obj) {
      if (key in mapping) {
        updatedObj[mapping[key]] = obj[key];
      }
    }
  } else {
    updatedObj = mapping[obj];
  }

  return updatedObj;
};

export const hasAnyValueGreaterThanZero = (obj, stringsToCheck) => {
  for (const key of stringsToCheck) {
    if (obj[key] > 0) {
      return true; // Return true if any matching string has a value greater than 0
    }
  }
};

export const severityTypeToText = (value) => {
  value = parseInt(value);
  if (value === 1) {
    return 'Low';
  } else if (value === 2) {
    return 'Moderate';
  } else if (value === 3) {
    return 'Important';
  } else {
    return 'Critical';
  }
};

export const noFiltersApplied = (params) => {
  const cleanedUpParams = _.cloneDeep(params);
  delete cleanedUpParams.sortIndex;
  delete cleanedUpParams.sortDirection;
  delete cleanedUpParams.offset;
  delete cleanedUpParams.limit;
  return Object.values(cleanedUpParams).filter((value) => !isEmpty(value));
};
