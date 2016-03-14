Template.residentActivityTypesChart.onRendered(function () {
  // Get activities from template data
  let activities = Template.currentData().activities;

  // Add 'type' field to each activity,
  // Containing activity type name
  activities = _.map(activities, function (activity) {
    activity.type = activity.activityType();
    return activity;
  });

  // Group activities by activity type
  const activityTypeCounts = d3.nest()
    .key(function (activity) {
      return activity.type;
    })
    .rollup(function (activityType) { return activityType.length })
    .entries(activities);
});
