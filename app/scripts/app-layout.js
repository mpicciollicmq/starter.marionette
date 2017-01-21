import Marionette from 'backbone.marionette';
import template from 'templates/layout';

export default Marionette.View.extend({
    
    template: template,
    
    serializeData() {
        return {
            name: 'World'
        };
    }
    
});