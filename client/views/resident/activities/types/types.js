Template.residentActivityTypesChart.onRendered(function () {
  // Get activities from template data
  let activities = Template.currentData().activities;

  // Add 'type' field to each activity,
  // Containing activity type name
  activities = _.map(activities, function (activity) {
    // Get activity type name via collection helper
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

    // Get reference to chart container
    const svg = dimple.newSvg("#activityTypesChart", "100%", "100%");

    // Initialize the activity type chart
    const activityTypesChart = new dimple.chart(svg, activityTypeCounts);

    // Set chart boundaries based on parent container size
    activityTypesChart.setBounds("5%", "5%", "95%", "80%");

    // Add activity types to x axis
    const xAxis = activityTypesChart.addCategoryAxis("x", "key");

    // Set the y axis title
    const xAxisTitle = TAPi18n.__("residentActivityTypesChart-xAxis-title");
    xAxis.title = xAxisTitle;

    // Reduce the x axis font size, so labels do not get truncated
    xAxis.fontSize = "7px";

    // Add activity type counts to y axis
    const yAxis = activityTypesChart.addMeasureAxis("y", "values");

    // Disable grid lines
    yAxis.showGridlines = false;

    // Set the y axis title
    const yAxisTitle = TAPi18n.__("residentActivityTypesChart-yAxis-title");
    yAxis.title = yAxisTitle;

    // Add bar plot
    activityTypesChart.addSeries(null, dimple.plot.bar);

    // Render chart
    activityTypesChart.draw();
});
