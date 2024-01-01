import Home from './components/home.js'
import ReactGA from 'react-ga'

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID
ReactGA.initialize(gaTrackingId, { debug: true })
ReactGA.pageview(window.location.pathname)

const App = () => {
    return <Home />
}

export default App
