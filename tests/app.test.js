import chai from 'chai'
import App from '../src/app/app'

const expect = chai.expect
const app = new App()

describe('App', () => {
    it('should have methods', () => {
        expect(app.onStart).to.be.an('function')
    })
    it('should have root layout', () => {
        app.start()
        expect(app.rootLayout).to.exist
    })
})