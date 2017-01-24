import Bn from 'backbone'
import Mn from 'backbone.marionette'
import AppLayout from './app-layout/view'

export default Mn.Application.extend({
    
    onStart: function() {
        this.rootLayout = new AppLayout({el: '#main'})
        this.rootLayout.render()
        Bn.history.start()
    }
    
})