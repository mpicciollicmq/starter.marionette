import Mn from 'backbone.marionette'

export default Mn.AppRouter.extend({
    
    appRoutes: {
        ''     : 'showUsers',
        'users': 'showUsers',
        'posts': 'showPosts'
    }
    
})