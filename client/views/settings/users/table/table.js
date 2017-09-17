Template.usersSettingsTable.onCreated(function () {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe("allUsers");
});

Template.usersSettingsTable.helpers({
  tableSettings () {
    const tableSettings = {
      collection: Meteor.users,
      fields: [
        {
          key: 'emails.0.address',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-email'),
        },
        {
          key: 'emails.0.verified',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-verified'),
        },
        {
          key: 'roles',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-roles'),
        },
        {
          label: TAPi18n.__('usersSettingsTable-tableHeaders-actions'),
          tmpl: Template.usersSettingsTableActions,
        },
      ]
    };

    return tableSettings;
  },
});
