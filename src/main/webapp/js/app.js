/**
 * Created by user on 05.06.2015.
 */
// create the module with name app
var app = angular.module('example', ['ngTable', 'ui.router', 'ui.bootstrap', 'xeditable']);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});