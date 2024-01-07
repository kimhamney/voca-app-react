import Home from './components/home.js'
import ReactGA from 'react-ga4'

const gaTrackingId = 'G-7Z37WVGPVZ'
ReactGA.initialize(gaTrackingId)
ReactGA.set({ page: window.location.pathname })
ReactGA.send('pageview')

const App = () => {
    return <Home />
}

export default App
