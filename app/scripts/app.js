import Marionette from 'backbone.marionette';
import AppLayout from 'app-layout';

var App = new Marionette.Application();

App.on('start', () => {
    App.rootLayout = new AppLayout({el: '#main'});
    App.rootLayout.render();
});

App.start();