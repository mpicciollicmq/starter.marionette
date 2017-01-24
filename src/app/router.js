import Mn from 'backbone.marionette'
import UsersView from './users/view'
import PostsView from './posts/view'

export default Mn.AppRouter.extend({
    
    routes: {
        '': 'users',
        'users': 'users',
        'posts': 'posts'
    },
    
    users() {
        const usersView = new UsersView({el: '#content'})
        usersView.render()
    },
    
    posts() {
        const postsView = new PostsView({el: '#content'})
        postsView.render()
    }
    
})