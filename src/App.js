import Home from './components/home.js'
import ReactGA from 'react-ga4'

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID
ReactGA.initialize(gaTrackingId)
ReactGA.set({ page: window.location.pathname })
ReactGA.send('pageview')

const App = () => {
    return <Home />
}

export default App
