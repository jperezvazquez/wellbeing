/*
Methods related to resident Feelings
*/

import d3 from 'd3';
import { isCurrentUserAdmin } from '../utils/user';

Meteor.methods({
  getFeelingsCountsByResidentId (residentId) {
    // Get all feelings observations for resident
    const residentFeelings = Feelings.find({ residentId }).fetch();

    // Get counts of feelings grouped by type
    return d3.nest()
      // each resident feeling observation has a 'feeling' field
      // group observations by value of 'feeling'
      .key(function (residentFeeling) { return residentFeeling.feeling })
      // count number of observations for each feeling type
      .rollup(function (feelingsArray) { return feelingsArray.length })
      // pass resident feelings into D3 nest/rollup
      .entries(residentFeelings);

  },
  getFeelingsPercentagesByResidentId (residentId) {
    // Get all feelings observations for resident
    const residentFeelings = Feelings.find({ residentId }).fetch();

    // Get counts of feelings grouped by type
    return d3.nest()
      // each resident feeling observation has a 'feeling' field
      // group observations by value of 'feeling'
      .key(function (residentFeeling) { return residentFeeling.feeling })
      // count percentage of observations for each feeling type
      .rollup(function (aggregateFeelings) { return aggregateFeelings.length / residentFeelings.length })
      // pass resident feelings into D3 nest/rollup
      .entries(residentFeelings);
  },

  addFeeling(feelingData){
    if (!isCurrentUserAdmin(this.userId)) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
    return Feelings.insert(feelingData);
  }
});
