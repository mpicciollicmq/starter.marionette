import Bn from 'backbone'
import Mn from 'backbone.marionette'
import Router from './router'
import AppLayout from './app-layout/view'

export default Mn.Application.extend({
    
    region: '#main',
    
    onStart() {
        const appLayout = new AppLayout()
        this.showView(appLayout)
        this.Router = new Router({controller: appLayout})
        Bn.history.start()
    }
    
})